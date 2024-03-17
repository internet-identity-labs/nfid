import {registerMappers, TransactionMapperRegistry} from "./mapper_registry";

describe("Mappers", () => {
    it("log mappers", () => {
        registerMappers()
        let mappers = TransactionMapperRegistry.size;
        console.log(mappers)
    })
})
