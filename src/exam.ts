import moment from 'moment';
import { MovieModel } from './movie.model';
async function run() {
	// const result = await MovieModel.find({name:"cuong"});

	// tim kiem theo ten khong pham biet chu hoa chu thuong

	const result = await MovieModel.find({ name: { $regex: "^T", $options: "i" } });
	// them options voi i se tim theo chu thuong
	//  regex: "^T", tim kiem bat dau voi chu T
	//  regex: "t$", tim kiem voi chu t o vi tri cuoi cung

	// search by country with $in return film in country
	//  dùng in để tìm kiếm trong mảng đó có chứa country đó thì nó sẽ trả về
	const country = await MovieModel.find({ country: { $in: ["Maldives", "Japan"] } });
	// search any film with releaseAt in mouth 01 any year
	// cách 1 dùng find({})
	const startDate = moment("2022-01-01").startOf('month').toDate();
	const endDate = moment("2022-01-01").endOf('month').toDate();
	const releaseAt = await MovieModel.find({ releaseAt: { $gte: startDate, $lte: endDate } });
	//  cach 2 dung aggregate
	// dùng $addField để thêm field vào document với giá trị là 1 object là releaseAt
	//  và dùng field mới tạo ra để dùng match để tim kiem
	const releaseAt2 = await MovieModel.aggregate([
		{
			$addFields: {
				month: { "$dateToString": { "format": "%m", "date": "$releaseAt" } }
			}
		},
		{
			$match: {
				month: "01"
			}
		}
	]);
	//  search film at us with rate > 3 or film at japan with rate > 4
	const rate = await MovieModel.find({
		$or: [
			{ country: "Belgium", rate: { $gt: 3 } },
			{ country: "Japan", rate: { $gt: 4 } }
		]
	});
	// search one film have country japan or Belgium with rate > 4
	const rate2 = await MovieModel.findOne({
		$or: [
			{ country: "Belgium", rate: { $gt: 3 } },
			{ country: "Japan", rate: { $gt: 4 } }
		]
	});
	// search film have two actor with name Olsen Miranda and Marcella Graves
	const actor = await MovieModel.find({
		actors: {
			$all: ["Olsen Miranda", "Jocelyn Macdonald"]
		}
	});
	// search film not have two actor with name Olsen Miranda and Marcella Graves
	const actor2 = await MovieModel.find({
		// actors: {
		// 	$nin: ["Olsen Miranda", "Jocelyn Macdonald"]

		// }
		actors: {
			$not: {
				$all: ["Olsen Miranda", "Jocelyn Macdonald"]
			}

		}
	});
	// find  and update field name cuong convert cuong 2
	const update = await MovieModel.findOneAndUpdate({ name: "cuong" }, { $set: { name: "cuong 2" } }, { new: true });

	//  search film have rating > 4 then set more recommended true
	const update2 = await MovieModel.updateMany({ rate: { $gt: 4 } }, { $set: { recommended: true } }, { new: true, upsert: true });

	//  use $match $group and $count file rate have film
	const count = await MovieModel.aggregate([
		{
			$group: { _id: "$rate", count: { $sum: 1 } }
		}

	]);

	//  pagination data
	var page = 2;
	var limit = 10;
	var offset = (page - 1) * limit;
	// $skip : la bo qua so phan tu dau tien trong mang
	const pagination = await MovieModel.aggregate([
		// {$sort:{rate:-1}},
		{$skip:offset},
		{$limit:limit}
	])

	//  show list all actors in database use $unwind and $group and $count
	//  use $unwind tach array thanh cac phan tu rieng
	const actors = await MovieModel.aggregate([
		{
			$unwind: "$actors"
		},
		{
			$group: {
				_id: "$actors",
				count: { $sum: 1 }
			}
		},
		// count list have actor
		{
			$group:{_id:null,count:{$sum: 1}}
		} 
	]);
	// search film have  actor size > 2 use $addFields and $match
	const actors2 = await MovieModel.aggregate([
		{
			$addFields: {
				actorSize: { $size: "$actors" }
			}
		},
		{
			$match: {
				actorSize: { $gt: 4 }
			}
		}
	]);


	console.log("actors", actors2);
}

export default run;