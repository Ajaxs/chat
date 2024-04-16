export class DialogRDO {
  public id: number;
  public title: string;
  public admin: number;
  public is_public: number;
  public users: number[];

  constructor(dialog) {
    this.id = dialog.id;
    this.admin = dialog.admin;
    this.is_public = dialog.is_public;
    this.title = dialog.title;
  }
}
