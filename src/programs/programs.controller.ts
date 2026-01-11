import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('programs')  // Clean path: /api/programs
export class ProgramsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getPrograms() {
    try {
      const programs = await this.prisma.program.findMany({
        include: {
          topics: true,
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
      return { data: [], count: 0 };
    }
  }

  @Post()
  async createProgram(@Body() dto: any) {
    try {
      const program = await this.prisma.program.create({
        data: {
          title: dto.title,
          description: dto.description,
          languagePrimary: dto.languagePrimary,
          languagesAvailable: dto.languagesAvailable,
          status: 'DRAFT'
        }
      });
      return { data: program, message: 'Program created successfully' };
    } catch (error) {
      console.error('Create program ERROR:', error.message);
      throw new HttpException('Failed to create program', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

