export interface JwtDto {
  email: string
  /**
   * Issued at
   */
  iat: number
  /**
   * Expiration time
   */
  exp: number
}
