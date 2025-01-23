import { Controller, Get } from '@nestjs/common';
import { ApiExcludeController, ApiOperation, ApiTags } from '@nestjs/swagger';

// @ApiExcludeController()
@ApiTags('Root')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Root endpoint' })
  getRoot() {
    return {
      message: 'API is running',
      availableEndpoints: {
        accounts: {
          getAll: '/api/accounts',
          getNames: '/api/accounts/names',
          getById: '/api/accounts/:id',
          paginated: '/api'
        }
      }
    };
  }
}
