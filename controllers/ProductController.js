const express = require("express");
const prisma = require("../prisma/client");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const findProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                stock: true,
            },
            orderBy: {
                id: "desc",
            },
        });

        res.status(200).send({
            success: true,
            message: "Get all products successfully",
            data: products,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};

const createProduct = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: "Validation error",
            errors: errors.array(),
        });
    }

    try {
        const product = await prisma.product.create({
            data: {
                name: req.body.name,
                description: req.body.description,
                price: parseFloat(req.body.price),
                stock: parseInt(req.body.stock),
            },
        });

        res.status(201).send({
            success: true,
            message: "Product created successfully",
            data: product,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error: error,
        });
    }
};

const findProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await prisma.product.findUnique({
            where: {
                id: Number(id),
            },
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                stock: true,
            },
        });

        res.status(200).send({
            success: true,
            message: `Get product By ID :${id}`,
            data: product,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: "Validation error",
            errors: errors.array(),
        });
    }

    try {
        const product = await prisma.product.update({
            where: {
                id: Number(id),
            },
            data: {
                name: req.body.name,
                description: req.body.description,
                price: parseFloat(req.body.price),
                stock: parseInt(req.body.stock),
            },
        });
        res.status(200).send({
            success: true,
            message: 'Product updated successfully',
            data: product,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.product.delete({
            where: {
                id: Number(id),
            },
        });
        
        res.status(200).send({
            success: true,
            message: 'Product deleted successfully',
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = { findProducts, createProduct, findProductById, updateProduct, deleteProduct };