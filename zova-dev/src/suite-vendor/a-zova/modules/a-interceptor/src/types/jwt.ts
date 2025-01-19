export interface IJwtAdapter {
  getAuthorization(): Promise<string | undefined>;
}
