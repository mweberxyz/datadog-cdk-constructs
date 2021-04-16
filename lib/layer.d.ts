import * as lambda from "@aws-cdk/aws-lambda";
import * as cdk from "@aws-cdk/core";
export declare const DD_ACCOUNT_ID = "464622532012";
export declare const DD_GOV_ACCOUNT_ID = "002406178527";
/**
 * @stability stable
 */
export declare enum RuntimeType {
    /**
     * @stability stable
     */
    NODE = 0,
    /**
     * @stability stable
     */
    PYTHON = 1,
    /**
     * @stability stable
     */
    UNSUPPORTED = 2
}
export declare const runtimeLookup: {
    [key: string]: RuntimeType;
};
export declare function applyLayers(scope: cdk.Construct, region: string, lambdas: lambda.Function[], pythonLayerVersion?: number, nodeLayerVersion?: number, extensionLayerVersion?: number): string[];
export declare function getLambdaLayerArn(region: string, version: number, runtime: string): string;
export declare function getExtensionLayerArn(region: string, version: number): string;
export declare function getMissingLayerVersionErrorMsg(functionKey: string, formalRuntime: string, paramRuntime: string): string;
export declare function generateLambdaLayerId(lambdaFunctionArn: string, runtime: string): string;
export declare function generateExtensionLayerId(lambdaFunctionArn: string): string;
