export class OAuthUser {
  constructor(data?: OAuthUser) {
    if (data) {
      this.userId = data.userId;
      this.userName = data.userName;
      this.email = data.email;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
    }
  }

  public userId: string;
  public userName: string;
  public email: string;
  public firstName: string;
  public lastName: string;
}
