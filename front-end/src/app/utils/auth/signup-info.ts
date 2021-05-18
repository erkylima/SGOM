export class SignUpInfo {
  name: string;
  cnpj: string;
  username: string;
  email: string;
  role: string;
  password: string;

  constructor(name: string, cnpj: string, username: string, email: string, password: string) {
      this.name = name;
      this.cnpj = cnpj;
      this.username = username;
      this.email = email;
      this.password = password;
      this.role= "ROLE_OFICINA";
  }
}
