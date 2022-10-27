import { Injectable } from '@nestjs/common';

@Injectable()
export class PermissionsService {
   /**
   * Check if input address is whitelistable according to business logic
   * @param address - adress that is inputted from user request
   * @throws {UnauthorizedException} - Error if the address is not whitelistable
   */
   async isUserWhitelistable(address: string) {
    // Use business logic to gate whitelist here
   }
  
  /**
   * Check if input address is admin according to db
   * @param address - adress that is inputted from user request
   * @throws {UnauthorizedException} - Error if the address is not admin
   */
  async isUserAdmin(address: string) {
    // check database for admin status
  }

  /**
   * Check if input address is whitelistable according to business logic
   * @param address - adress that is inputted from user request
   * @throws {UnauthorizedException} - Error if the address is not whitelistable
   */
  async checkPermissionsToTransferERC20(address: string) {
    // Use business logic to gate ERC20 transfer here
    // ie. check user in db, check user verified address, check if user has minted token before, etc.
  }
}
