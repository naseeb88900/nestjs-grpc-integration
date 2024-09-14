# gRPC Integration with NestJS

This repository demonstrates how to integrate gRPC with NestJS, showcasing the implementation of a microservices architecture using gRPC for communication between services. This project serves as a practical example for developers looking to understand and implement gRPC in their applications.

## Table of Contents

- [Introduction](#introduction)
- [Theoretical Background](#theoretical-background)
  - [Local Call vs RPC](#local-call-vs-rpc)
  - [Protocol Buffers (ProtoBuf)](#protocol-buffers-protobuf)
  - [HTTP Overview](#http-overview)
  - [gRPC Overview](#grpc-overview)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Technical Implementation](#technical-implementation)
  - [Monorepo Setup](#monorepo-setup)
  - [Defining gRPC Services](#defining-grpc-services)
  - [Generating TypeScript Files](#generating-typescript-files)
  - [Implementing gRPC Microservice](#implementing-grpc-microservice)
- [Usage Examples](#usage-examples)

## Introduction

This project serves as a practical example of how to implement gRPC in a NestJS application, providing a robust framework for building efficient microservices. gRPC is particularly useful for connecting services in a distributed system, allowing for high-performance communication.

## Theoretical Background

### Local Call vs RPC

- **Local Procedure Call**: A function call within a process to execute some code. This is straightforward and efficient, as it operates within the same memory space.
- **Remote Procedure Call (RPC)**: A software communication protocol that enables one machine to invoke code on another machine as if it were a local function call. This abstraction allows developers to build distributed systems more easily. However, RPC implementations may pose security risks such as unauthorized access and injection attacks.

### Protocol Buffers (ProtoBuf)

- **Definition**: An encoding mechanism that is independent of any language or platform. It allows for efficient serialization of structured data.
- **Schema Definition**: Supports strongly typed schema definitions, ensuring that data adheres to a specified structure.
- **Proto Files**: The structure of data over the wire is defined in a `.proto` file. gRPC services are also defined in a `.proto` file, which describes the service methods and their input/output message types.

### HTTP Overview

- **HTTP/0.9**: Only supported GET requests; no headers or status codes.
- **HTTP/1.0**: Introduced headers, status codes, and new methods like POST and HEAD. Each request needed its own connection, leading to inefficiencies.
- **HTTP/1.1**: Introduced persistent connections, allowing multiple requests over one TCP connection, and added features like chunked transfer encoding and better caching.
- **HTTP/2.0**: Introduced a binary framing layer, message division into frames, header compression (HPACK), and server push capabilities, significantly improving performance.

### gRPC Overview

- **Definition**: An open-source RPC framework created by Google in 2016, designed to connect microservices efficiently.
- **Architecture**: Built on top of HTTP/2, providing high performance and scalability. It allows for bi-directional streaming and multiplexing of requests over a single connection.
- **Data Interchange Format**: Uses Protocol Buffers by default as its data interchange format, but supports other formats like JSON.
- **Performance**: gRPC is popular due to its efficient binary encoding format, which is significantly faster than JSON, making it suitable for high-performance applications.

## Project Structure

- `apps/api/`: Contains the REST API implementation, which interacts with the gRPC service.
- `apps/burger-shop/`: Contains the gRPC service implementation, handling business logic and database interactions.
- `proto/`: Contains the `.proto` definitions for gRPC services, defining the service methods and message types.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- nvm (Node Version Manager) installed on your machine.
- Protocol Buffers installed on your system.

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/naseeb88900/nestjs-grpc-integration.git
    ```

2. Navigate to the project directory:

    ```bash
    cd grpc-nestjs-integration
    ```

3. Use the correct Node.js version:

    ```bash
    nvm use
    ```

    If you don't have the required version of Node.js installed, you can install it using:

    ```bash
    nvm install
    ```

4. Install dependencies:

    ```bash
    npm install
    ```

5. Generate TypeScript files from the `.proto` definitions:

    ```bash
    protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=./ --ts_proto_opt=nestJs=true ./proto/burger-shop.proto
    ```

6. Start the development servers for both projects:

    ```bash
    # In one terminal for the REST API
    cd apps/api
    npm run start:dev

    # In another terminal for the gRPC service
    cd ../burger-shop
    npm run start:dev
    ```

## Technical Implementation

### Monorepo Setup

This project is structured as a monorepo, allowing for easy management of multiple related applications. The `apps` directory contains both the REST API and gRPC service, facilitating communication between them.

### Defining gRPC Services

The gRPC service is defined in the `proto/burger-shop.proto` file. This file specifies the service methods and the message types used for communication. For example:

```bash
protobuf
syntax = "proto3";
package burger_shop;
service BurgerShopService {
rpc CreateBurgerShop (BurgerShop) returns (BurgerShop);
rpc GetBurgerShops (Empty) returns (BurgerShops);
}
message BurgerShop {
string id = 1;
string name = 2;
string location = 3;
}
message Empty {}
message BurgerShops {
repeated BurgerShop shops = 1;
}
```


### Generating TypeScript Files

After defining the service in the `.proto` file, TypeScript files are generated using the Protocol Buffers compiler. This step creates the necessary TypeScript definitions for the messages and services, allowing for type-safe interactions in the NestJS application.

### Implementing gRPC Microservice

The gRPC service is implemented in the `apps/burger-shop` directory. The service methods interact with a database to fetch or create data. The REST API, located in `apps/api`, calls these gRPC methods to perform operations.

Here’s an example of a gRPC service implementation:

```bash
typescript:apps/burger-shop/src/burger-shop.service.ts
import { Injectable } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { BurgerShop } from './interfaces/burger-shop.interface';
@Injectable()
export class BurgerShopService {
private readonly shops: BurgerShop[] = [];
@GrpcMethod('BurgerShopService', 'CreateBurgerShop')
create(data: BurgerShop): BurgerShop {
this.shops.push(data);
return data;
}
@GrpcMethod('BurgerShopService', 'GetBurgerShops')
getAll(): BurgerShop[] {
return this.shops;
}
}
```

## Usage Examples

To interact with the gRPC service, you can use a gRPC client or create a simple REST API that calls the gRPC methods. Here’s an example of how to call the `CreateBurgerShop` method from the REST API:

```bash
typescript:apps/api/src/burger-shop.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { GrpcService } from '@nestjs/microservices';
import { CreateBurgerShopDto } from './dto/create-burger-shop.dto';
@Controller('burger-shops')
export class BurgerShopController {
constructor(private readonly grpcService: GrpcService) {}
@Post()
async create(@Body() createBurgerShopDto: CreateBurgerShopDto) {
return this.grpcService.createBurgerShop(createBurgerShopDto);
}
}
```


## Conclusion

This project provides a comprehensive example of integrating gRPC with NestJS, demonstrating the power of gRPC for building efficient microservices. By following the steps outlined in this README, you can set up your own gRPC service and explore the benefits of using Protocol Buffers and HTTP/2 for high-performance communication.
