// import {Request, Response} from "express";
import {Param, Body, Get, Post, Put, Delete, JsonController} from "routing-controllers";

@JsonController()
export class SkuController {

    @Get("/sku")
    getAll() {
       return "This action returns all sku";
    }

    @Get("/sku/:id")
    getOne(@Param("id") id: number) {
       return "This action returns sku #" + id;
    }

    @Post("/sku")
    post(@Body() sku: any) {
       return "Saving sku...";
    }

    @Put("/sku/:id")
    put(@Param("id") id: number, @Body() sku: any) {
       return "Updating a sku...";
    }

    @Delete("/sku/:id")
    remove(@Param("id") id: number) {
       return "Removing sku...";
    }
}