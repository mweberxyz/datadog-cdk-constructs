import * as lambda from "@aws-cdk/aws-lambda";
export declare const enableDDTracingEnvVar = "DD_TRACE_ENABLED";
export declare const injectLogContextEnvVar = "DD_LOG_INJECTION";
export declare const defaultEnvVar: {
    addLayers: boolean;
    enableDatadogTracing: boolean;
    injectLogContext: boolean;
};
export declare function applyEnvVariables(lambdas: lambda.Function[], enableDatadogTracing: boolean, injectLogContext: boolean): void;
