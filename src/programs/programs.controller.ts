import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('programs')
export class ProgramsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getPrograms() {
    const programs = await this.prisma.program.findMany({
      include: {
        terms: {
          include: {
            lessons: true
          }
        }
      }
    });

    return {
      data: programs,
      count: programs.length
    };
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

      return { data: program };
    } catch (error) {
      throw new HttpException(
        'Failed to create program',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}

