import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('api/api')
export class ProgramsController {
  constructor(private prisma: PrismaService) {}

  @Get('programs')
  async getPrograms() {
    try {
      // ✅ REAL DATABASE QUERY (tables now exist)
      const programs = await this.prisma.program.findMany({
        include: {
          terms: {
            include: {
              lessons: true
            }
          }
        }
      });
      return { data: programs, count: programs.length };
    } catch (error) {
      console.error('ProgramsController ERROR:', error.message);
      return { data: [], count: 0 }; // Graceful fallback
    }
  }

  @Post('programs')
  async createProgram(@Body() createProgramDto: any) {
    try {
      const program = await this.prisma.program.create({
        data: {
          title: createProgramDto.title,
          description: createProgramDto.description,
          languagePrimary: createProgramDto.languagePrimary,
          languagesAvailable: createProgramDto.languagesAvailable,
          status: 'DRAFT'
        }
      });
      return { data: program, message: 'Program created successfully' };
    } catch (error) {
      console.error('Create program error:', error);
      throw new HttpException('Failed to create program', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}








