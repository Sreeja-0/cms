import { Controller, Get } from '@nestjs/common';

@Controller('api')  // ← CRITICAL: Matches your URL
export class HealthController {
  @Get('health')
  getHealth() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }

  @Get()  // Handles /api exactly
  getApiRoot() {
    return { 
      message: 'CMS API v1.0', 
      endpoints: ['GET /api/health', 'POST /api/programs'],
      status: 'production'
    };
  }
}
