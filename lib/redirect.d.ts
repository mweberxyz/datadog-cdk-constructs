import * as lambda from "@aws-cdk/aws-lambda";
export declare const DD_HANDLER_ENV_VAR = "DD_LAMBDA_HANDLER";
export declare const PYTHON_HANDLER = "datadog_lambda.handler.handler";
export declare const JS_HANDLER_WITH_LAYERS = "/opt/nodejs/node_modules/datadog-lambda-js/handler.handler";
export declare const JS_HANDLER = "node_modules/datadog-lambda-js/dist/handler.handler";
/**
 * To avoid modifying code in the user's lambda handler, redirect the handler to a Datadog
 * handler that initializes the Lambda Layers and then calls the original handler.
 * 'DD_LAMBDA_HANDLER' is set to the original handler in the lambda's environment for the
 * replacement handler to find.
 */
export declare function redirectHandlers(lambdas: lambda.Function[], addLayers: boolean): void;
