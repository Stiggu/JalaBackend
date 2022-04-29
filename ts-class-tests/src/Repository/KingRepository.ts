import BaseRepository from "./Base/BaseRepositoy";
import King  from "../Entities/king";

// now, we have all code implementation from BaseRepository
export default class KingRepository extends BaseRepository<King>{

    howManyKings(): number {
        console.log(1);
        return 1;
    }
}