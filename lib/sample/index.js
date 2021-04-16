"use strict";
/*
 * Unless explicitly stated otherwise all files in this repository are licensed
 * under the Apache License Version 2.0.
 *
 * This product includes software developed at Datadog (https://www.datadoghq.com/).
 * Copyright 2021 Datadog, Inc.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleStack = void 0;
const lambda = require("@aws-cdk/aws-lambda");
const cdk = require("@aws-cdk/core");
const index_1 = require("../index");
class ExampleStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // user's lambda function
        const hello = new lambda.Function(this, "HelloHandler", {
            runtime: lambda.Runtime.NODEJS_10_X,
            code: lambda.Code.fromAsset("./src/sample/lambda"),
            handler: "hello.handler",
        });
        const hello1 = new lambda.Function(this, "HelloHandler1", {
            runtime: lambda.Runtime.NODEJS_10_X,
            code: lambda.Code.fromAsset("./src/sample/lambda"),
            handler: "hello.handler",
        });
        const hello2 = new lambda.Function(this, "HelloHandler2", {
            runtime: lambda.Runtime.PYTHON_3_7,
            code: lambda.Code.fromAsset("./src/sample/lambda"),
            handler: "hello_py.handler",
            tracing: lambda.Tracing.ACTIVE,
        });
        const datadogCDK = new index_1.Datadog(this, "Datadog", {
            nodeLayerVersion: 39,
            pythonLayerVersion: 24,
            forwarderArn: "<forwarder_ARN>",
            enableDatadogTracing: true,
            flushMetricsToLogs: true,
            apiKey: "1234",
            site: "datadoghq.com",
        });
        datadogCDK.addLambdaFunctions([hello, hello1, hello2]);
    }
}
exports.ExampleStack = ExampleStack;
const app = new cdk.App();
const stack = new ExampleStack(app, "ExampleStack");
console.log("Stack name: " + stack.stackName);
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2FtcGxlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7OztBQUVILDhDQUE4QztBQUM5QyxxQ0FBcUM7QUFDckMsb0NBQW1DO0FBRW5DLE1BQWEsWUFBYSxTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQ3pDLFlBQVksS0FBYyxFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUM1RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4Qix5QkFBeUI7UUFDekIsTUFBTSxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUU7WUFDdEQsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNuQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMscUJBQXFCLENBQUM7WUFDbEQsT0FBTyxFQUFFLGVBQWU7U0FDekIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxlQUFlLEVBQUU7WUFDeEQsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNuQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMscUJBQXFCLENBQUM7WUFDbEQsT0FBTyxFQUFFLGVBQWU7U0FDekIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxlQUFlLEVBQUU7WUFDeEQsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVTtZQUNsQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMscUJBQXFCLENBQUM7WUFDbEQsT0FBTyxFQUFFLGtCQUFrQjtZQUMzQixPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNO1NBQy9CLENBQUMsQ0FBQztRQUVILE1BQU0sVUFBVSxHQUFHLElBQUksZUFBTyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUU7WUFDOUMsZ0JBQWdCLEVBQUUsRUFBRTtZQUNwQixrQkFBa0IsRUFBRSxFQUFFO1lBQ3RCLFlBQVksRUFBRSxpQkFBaUI7WUFDL0Isb0JBQW9CLEVBQUUsSUFBSTtZQUMxQixrQkFBa0IsRUFBRSxJQUFJO1lBQ3hCLE1BQU0sRUFBRSxNQUFNO1lBQ2QsSUFBSSxFQUFFLGVBQWU7U0FDdEIsQ0FBQyxDQUFDO1FBQ0gsVUFBVSxDQUFDLGtCQUFrQixDQUFDLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7Q0FDRjtBQW5DRCxvQ0FtQ0M7QUFFRCxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUMxQixNQUFNLEtBQUssR0FBRyxJQUFJLFlBQVksQ0FBQyxHQUFHLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzlDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBVbmxlc3MgZXhwbGljaXRseSBzdGF0ZWQgb3RoZXJ3aXNlIGFsbCBmaWxlcyBpbiB0aGlzIHJlcG9zaXRvcnkgYXJlIGxpY2Vuc2VkXG4gKiB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UgVmVyc2lvbiAyLjAuXG4gKlxuICogVGhpcyBwcm9kdWN0IGluY2x1ZGVzIHNvZnR3YXJlIGRldmVsb3BlZCBhdCBEYXRhZG9nIChodHRwczovL3d3dy5kYXRhZG9naHEuY29tLykuXG4gKiBDb3B5cmlnaHQgMjAyMSBEYXRhZG9nLCBJbmMuXG4gKi9cblxuaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gXCJAYXdzLWNkay9hd3MtbGFtYmRhXCI7XG5pbXBvcnQgKiBhcyBjZGsgZnJvbSBcIkBhd3MtY2RrL2NvcmVcIjtcbmltcG9ydCB7IERhdGFkb2cgfSBmcm9tIFwiLi4vaW5kZXhcIjtcblxuZXhwb3J0IGNsYXNzIEV4YW1wbGVTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQXBwLCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICAvLyB1c2VyJ3MgbGFtYmRhIGZ1bmN0aW9uXG4gICAgY29uc3QgaGVsbG8gPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsIFwiSGVsbG9IYW5kbGVyXCIsIHtcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xMF9YLFxuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KFwiLi9zcmMvc2FtcGxlL2xhbWJkYVwiKSxcbiAgICAgIGhhbmRsZXI6IFwiaGVsbG8uaGFuZGxlclwiLFxuICAgIH0pO1xuXG4gICAgY29uc3QgaGVsbG8xID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCBcIkhlbGxvSGFuZGxlcjFcIiwge1xuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzEwX1gsXG4gICAgICBjb2RlOiBsYW1iZGEuQ29kZS5mcm9tQXNzZXQoXCIuL3NyYy9zYW1wbGUvbGFtYmRhXCIpLFxuICAgICAgaGFuZGxlcjogXCJoZWxsby5oYW5kbGVyXCIsXG4gICAgfSk7XG5cbiAgICBjb25zdCBoZWxsbzIgPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsIFwiSGVsbG9IYW5kbGVyMlwiLCB7XG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5QWVRIT05fM183LFxuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KFwiLi9zcmMvc2FtcGxlL2xhbWJkYVwiKSxcbiAgICAgIGhhbmRsZXI6IFwiaGVsbG9fcHkuaGFuZGxlclwiLFxuICAgICAgdHJhY2luZzogbGFtYmRhLlRyYWNpbmcuQUNUSVZFLFxuICAgIH0pO1xuXG4gICAgY29uc3QgZGF0YWRvZ0NESyA9IG5ldyBEYXRhZG9nKHRoaXMsIFwiRGF0YWRvZ1wiLCB7XG4gICAgICBub2RlTGF5ZXJWZXJzaW9uOiAzOSxcbiAgICAgIHB5dGhvbkxheWVyVmVyc2lvbjogMjQsXG4gICAgICBmb3J3YXJkZXJBcm46IFwiPGZvcndhcmRlcl9BUk4+XCIsXG4gICAgICBlbmFibGVEYXRhZG9nVHJhY2luZzogdHJ1ZSxcbiAgICAgIGZsdXNoTWV0cmljc1RvTG9nczogdHJ1ZSxcbiAgICAgIGFwaUtleTogXCIxMjM0XCIsXG4gICAgICBzaXRlOiBcImRhdGFkb2docS5jb21cIixcbiAgICB9KTtcbiAgICBkYXRhZG9nQ0RLLmFkZExhbWJkYUZ1bmN0aW9ucyhbaGVsbG8sIGhlbGxvMSwgaGVsbG8yXSk7XG4gIH1cbn1cblxuY29uc3QgYXBwID0gbmV3IGNkay5BcHAoKTtcbmNvbnN0IHN0YWNrID0gbmV3IEV4YW1wbGVTdGFjayhhcHAsIFwiRXhhbXBsZVN0YWNrXCIpO1xuY29uc29sZS5sb2coXCJTdGFjayBuYW1lOiBcIiArIHN0YWNrLnN0YWNrTmFtZSk7XG5hcHAuc3ludGgoKTtcbiJdfQ==