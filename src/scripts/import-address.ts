import dataAddressJson from "../assets/data-address.json";
import { AddressModel } from "../modules/address/address.model";

export async function run() {

  // step 2 tranform data to address
  const addressDocument: any = [];
  dataAddressJson.forEach((province:any) => {
    addressDocument.push({
      provinceId: province.pid,
      province: province.pn,
    });
    province.ds.forEach((district:any) => {
      addressDocument.push({
        provinceId: province.pid,
        province: province.pn,
        districtId: district.did,
        district: district.dn,
      });
      district.ws.forEach((ward:any) => {
        addressDocument.push({
          provinceId: province.pid,
          province: province.pn,
          districtId: district.did,
          district: district.dn,
          wardId: ward.wid,
          ward: ward.wn,
        });
      });
    });
  });
  console.log("address",addressDocument.length);
  await AddressModel.insertMany(addressDocument);
  console.log("insert successful")
}

run();
