//Song Object
export class Song {

  constructor(fields: any) {    
    for (const f in fields) {
      this[f] = fields[f];
    }
  }

}
