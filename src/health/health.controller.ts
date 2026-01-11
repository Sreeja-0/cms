import { Controller, Get } from '@nestjs/common';

@Controller()  // No extra prefix with globalPrefix
export class HealthController {
  @Get('health')
  getHealth() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }

  @Get()
  getApiRoot() {
    return { 
      message: 'CMS API v1.0', 
      endpoints: ['GET /api/health', 'GET /api/programs', 'POST /api/programs'],
      status: 'production'
    };
  }
}



