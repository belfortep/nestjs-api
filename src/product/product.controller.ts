import { Controller,NotFoundException, Get, Post, Delete, Put, Res, HttpStatus, Body, Param } from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) {}

    @Post('/create')
    async createProduct(@Res() res, @Body() createProductDTO: CreateProductDTO){
        const product=await this.productService.createProduct(createProductDTO);
        
        return res.status(HttpStatus.OK).json({
            product
        })

    }

    @Get('/')
    async getProducts(@Res() res){
        const products = this.productService.getProducts()

        res.status(HttpStatus.OK).json({
            products
        })
    }


    @Get('/:id')
    async getProduct(@Res() res, @Param('id') id){
        const product = await this.productService.getProduct(id)
        if(!product) throw new NotFoundException('Product not found')
        res.status(HttpStatus.OK).json({
            product
        })
    }

    @Delete('/:id')
    async deleteProduct(@Res() res, @Param('id') id){

        const deletedProduct = await this.productService.deleteProduct(id)
        if(!deletedProduct) throw new NotFoundException('Product not found')
        res.status(HttpStatus.OK).json(deletedProduct)

    }

    @Put('/:id')
    async updateProduct(@Res() res, @Param('id') id, @Body() createProductDTO: CreateProductDTO){

        const updatedProduct = await this.productService.updateProduct(id, createProductDTO)
        if(!updatedProduct) throw new NotFoundException('Product not found')
        res.status(HttpStatus.OK).json(updatedProduct)

    }



}
