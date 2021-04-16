import * as lambda from "@aws-cdk/aws-lambda";
import * as cdk from "@aws-cdk/core";
import { Transport } from "./transport";
/**
 * @stability stable
 */
export interface DatadogProps {
    /**
     * @stability stable
     */
    readonly pythonLayerVersion?: number;
    /**
     * @stability stable
     */
    readonly nodeLayerVersion?: number;
    /**
     * @stability stable
     */
    readonly extensionLayerVersion?: number;
    /**
     * @stability stable
     */
    readonly addLayers?: boolean;
    /**
     * @stability stable
     */
    readonly forwarderArn?: string;
    /**
     * @stability stable
     */
    readonly flushMetricsToLogs?: boolean;
    /**
     * @stability stable
     */
    readonly site?: string;
    /**
     * @stability stable
     */
    readonly apiKey?: string;
    /**
     * @stability stable
     */
    readonly apiKmsKey?: string;
    /**
     * @stability stable
     */
    readonly enableDatadogTracing?: boolean;
    /**
     * @stability stable
     */
    readonly injectLogContext?: boolean;
}
/**
 * @stability stable
 */
export declare class Datadog extends cdk.Construct {
    /**
     * @stability stable
     */
    scope: cdk.Construct;
    /**
     * @stability stable
     */
    props: DatadogProps;
    /**
     * @stability stable
     */
    transport: Transport;
    /**
     * @stability stable
     */
    constructor(scope: cdk.Construct, id: string, props: DatadogProps);
    /**
     * @stability stable
     */
    addLambdaFunctions(lambdaFunctions: lambda.Function[]): void;
}
