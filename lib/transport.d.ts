import * as lambda from "@aws-cdk/aws-lambda";
export declare const apiKeyEnvVar = "DD_API_KEY";
export declare const apiKeyKMSEnvVar = "DD_KMS_API_KEY";
export declare const siteURLEnvVar = "DD_SITE";
export declare const logForwardingEnvVar = "DD_FLUSH_TO_LOG";
export declare const transportDefaults: {
    site: string;
    flushMetricsToLogs: boolean;
    enableDatadogTracing: boolean;
};
/**
 * @stability stable
 */
export declare class Transport {
    /**
     * @stability stable
     */
    flushMetricsToLogs: boolean;
    /**
     * @stability stable
     */
    site: string;
    /**
     * @stability stable
     */
    apiKey?: string;
    /**
     * @stability stable
     */
    apiKmsKey?: string;
    /**
     * @stability stable
     */
    extensionLayerVersion?: number;
    /**
     * @stability stable
     */
    constructor(flushMetricsToLogs?: boolean, site?: string, apiKey?: string, apiKmsKey?: string, extensionLayerVersion?: number);
    /**
     * @stability stable
     */
    applyEnvVars(lambdas: lambda.Function[]): void;
}
