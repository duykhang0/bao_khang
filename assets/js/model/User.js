export class User {
    constructor(data={}) {
      this.email = data.email?? "";
      this.password = data.password ?? "";
      this.name = data.name ?? "";
      this.gender = data.gender ?? "";
      this.phone = data.phone ?? "";
    }
  }