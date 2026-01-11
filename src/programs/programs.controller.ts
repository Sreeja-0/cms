import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('api/api')
export class ProgramsController {
  constructor(private prisma: PrismaService) {}

  @Get('programs')
  async getPrograms() {
    // 🚨 NO DATABASE - Returns empty until tables created
    return { data: [], count: 0 };
  }

  @Post('programs')
  async createProgram(@Body() createProgramDto: any) {
    // 🚨 NO DATABASE - Fake success response
    return { 
      data: { 
        id: 'demo-123', 
        title: createProgramDto.title || 'Demo Program',
        status: 'DRAFT' 
      }, 
      message: 'Program created successfully (demo mode)' 
    };
  }
}







