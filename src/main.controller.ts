import { Controller, Get, Render } from '@nestjs/common';


@Controller()
export class MainController {
    @Get()
    @Render('MainPage')
    async index() {
    }
}
