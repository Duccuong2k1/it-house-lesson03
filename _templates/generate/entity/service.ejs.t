---
to: src/modules/<%= h.inflection.camelize(name,true) %>/<%= h.inflection.camelize(name, true) %>.service.ts

---


import { CrudService } from "../../base/crudService";
import { <%= h.inflection.camelize(name) %>, <%= h.inflection.camelize(name) %>Model } from "./<%= h.inflection.camelize(name, true) %>.model";

class <%= h.inflection.camelize(name) %>Service extends CrudService<<%= h.inflection.camelize(name) %>>{
    constructor(){
        super(<%= h.inflection.camelize(name) %>Model);
    }
}

export const <%= h.inflection.camelize(name, true) %>Service = new <%= h.inflection.camelize(name) %>Service()