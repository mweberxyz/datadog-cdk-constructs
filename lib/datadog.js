"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Datadog = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const cdk = require("@aws-cdk/core");
const loglevel_1 = require("loglevel");
const index_1 = require("./index");
const transport_1 = require("./transport");
/**
 * @stability stable
 */
class Datadog extends cdk.Construct {
    /**
     * @stability stable
     */
    constructor(scope, id, props) {
        if (process.env.DD_CONSTRUCT_DEBUG_LOGS == "true")
            loglevel_1.default.setLevel("debug");
        super(scope, id);
        this.scope = scope;
        this.props = props;
        validateProps(this.props);
        this.transport = new transport_1.Transport(this.props.flushMetricsToLogs, this.props.site, this.props.apiKey, this.props.apiKmsKey, this.props.extensionLayerVersion);
    }
    /**
     * @stability stable
     */
    addLambdaFunctions(lambdaFunctions) {
        let addLayers = this.props.addLayers;
        let enableDatadogTracing = this.props.enableDatadogTracing;
        let injectLogContext = this.props.injectLogContext;
        if (addLayers === undefined) {
            loglevel_1.default.debug(`No value provided for addLayers, defaulting to ${index_1.defaultEnvVar.addLayers}`);
            addLayers = index_1.defaultEnvVar.addLayers;
        }
        if (enableDatadogTracing === undefined) {
            loglevel_1.default.debug(`No value provided for enableDatadogTracing, defaulting to ${index_1.defaultEnvVar.enableDatadogTracing}`);
            enableDatadogTracing = index_1.defaultEnvVar.enableDatadogTracing;
        }
        if (injectLogContext === undefined) {
            loglevel_1.default.debug(`No value provided for injectLogContext, defaulting to ${index_1.defaultEnvVar.injectLogContext}`);
            injectLogContext = index_1.defaultEnvVar.injectLogContext;
        }
        if (this.props !== undefined && lambdaFunctions.length > 0) {
            const region = `${lambdaFunctions[0].env.region}`;
            loglevel_1.default.debug(`Using region: ${region}`);
            index_1.applyLayers(this.scope, region, lambdaFunctions, this.props.pythonLayerVersion, this.props.nodeLayerVersion, this.props.extensionLayerVersion);
            index_1.redirectHandlers(lambdaFunctions, addLayers);
            if (this.props.forwarderArn !== undefined) {
                loglevel_1.default.debug(`Adding log subscriptions using provided Forwarder ARN: ${this.props.forwarderArn}`);
                index_1.addForwarder(this.scope, lambdaFunctions, this.props.forwarderArn);
            }
            else {
                loglevel_1.default.debug("Forwarder ARN not provided, no log group subscriptions will be added");
            }
            index_1.applyEnvVariables(lambdaFunctions, enableDatadogTracing, injectLogContext);
            this.transport.applyEnvVars(lambdaFunctions);
        }
    }
}
exports.Datadog = Datadog;
_a = JSII_RTTI_SYMBOL_1;
Datadog[_a] = { fqn: "datadog-cdk-constructs.Datadog", version: "0.2.0" };
function validateProps(props) {
    loglevel_1.default.debug("Validating props...");
    const siteList = ["datadoghq.com", "datadoghq.eu", "us3.datadoghq.com", "ddog-gov.com"];
    if (props.apiKey !== undefined && props.apiKmsKey !== undefined) {
        throw new Error("Both `apiKey` and `apiKmsKey` cannot be set.");
    }
    if (props.site !== undefined && !siteList.includes(props.site.toLowerCase())) {
        throw new Error("Warning: Invalid site URL. Must be either datadoghq.com, datadoghq.eu, us3.datadoghq.com, or ddog-gov.com.");
    }
    if (props.apiKey === undefined && props.apiKmsKey === undefined && props.flushMetricsToLogs === false) {
        throw new Error("When `flushMetricsToLogs` is false, `apiKey` or `apiKmsKey` must also be set.");
    }
    if (props.extensionLayerVersion !== undefined) {
        if (props.forwarderArn !== undefined) {
            throw new Error("`extensionLayerVersion` and `forwarderArn` cannot be set at the same time.");
        }
        if (props.apiKey === undefined && props.apiKmsKey === undefined) {
            throw new Error("When `extensionLayer` is set, `apiKey` or `apiKmsKey` must also be set.");
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWRvZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXRhZG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBU0EscUNBQXFDO0FBQ3JDLHVDQUEyQjtBQUMzQixtQ0FBd0c7QUFDeEcsMkNBQXdDOzs7O0FBZ0J4QyxNQUFhLE9BQVEsU0FBUSxHQUFHLENBQUMsU0FBUzs7OztJQUl4QyxZQUFZLEtBQW9CLEVBQUUsRUFBVSxFQUFFLEtBQW1CO1FBQy9ELElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsSUFBSSxNQUFNO1lBQUUsa0JBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekUsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxxQkFBUyxDQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFDZixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQ2pDLENBQUM7SUFDSixDQUFDOzs7O0lBRU0sa0JBQWtCLENBQUMsZUFBa0M7UUFDMUQsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFDckMsSUFBSSxvQkFBb0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDO1FBQzNELElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztRQUNuRCxJQUFJLFNB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QUVELElBQUksS0FBSyxDQUFDLHFCQUFxQixLQUFLLFNBQVMsRUFBRTtRQUM3QyxJQUFJLEtBQUssQ0FBQyxZQUFZLEtBQUssU0FBUyxFQUFFO1lBQ3BDLE1BQU0sSUFBSSxLQUFLLENBQUMsNEVBQTRFLENBQUMsQ0FBQztTQUMvRjtRQUNELElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxTQUFTLElBQUksS0FBSyxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUU7WUFDL0QsTUFBTSxJQUFJLEtBQUssQ0FBQyx5RUFBeUUsQ0FBQyxDQUFDO1NBQzVGO0tBQ0Y7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFVubGVzcyBleHBsaWNpdGx5IHN0YXRlZCBvdGhlcndpc2UgYWxsIGZpbGVzIGluIHRoaXMgcmVwb3NpdG9yeSBhcmUgbGljZW5zZWRcbiAqIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSBWZXJzaW9uIDIuMC5cbiAqXG4gKiBUaGlzIHByb2R1Y3QgaW5jbHVkZXMgc29mdHdhcmUgZGV2ZWxvcGVkIGF0IERhdGFkb2cgKGh0dHBzOi8vd3d3LmRhdGFkb2docS5jb20vKS5cbiAqIENvcHlyaWdodCAyMDIxIERhdGFkb2csIEluYy5cbiAqL1xuXG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSBcIkBhd3MtY2RrL2F3cy1sYW1iZGFcIjtcbmltcG9ydCAqIGFzIGNkayBmcm9tIFwiQGF3cy1jZGsvY29yZVwiO1xuaW1wb3J0IGxvZyBmcm9tIFwibG9nbGV2ZWxcIjtcbmltcG9ydCB7IGFwcGx5TGF5ZXJzLCByZWRpcmVjdEhhbmRsZXJzLCBhZGRGb3J3YXJkZXIsIGFwcGx5RW52VmFyaWFibGVzLCBkZWZhdWx0RW52VmFyIH0gZnJvbSBcIi4vaW5kZXhcIjtcbmltcG9ydCB7IFRyYW5zcG9ydCB9IGZyb20gXCIuL3RyYW5zcG9ydFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIERhdGFkb2dQcm9wcyB7XG4gIHJlYWRvbmx5IHB5dGhvbkxheWVyVmVyc2lvbj86IG51bWJlcjtcbiAgcmVhZG9ubHkgbm9kZUxheWVyVmVyc2lvbj86IG51bWJlcjtcbiAgcmVhZG9ubHkgZXh0ZW5zaW9uTGF5ZXJWZXJzaW9uPzogbnVtYmVyO1xuICByZWFkb25seSBhZGRMYXllcnM/OiBib29sZWFuO1xuICByZWFkb25seSBmb3J3YXJkZXJBcm4/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IGZsdXNoTWV0cmljc1RvTG9ncz86IGJvb2xlYW47XG4gIHJlYWRvbmx5IHNpdGU/OiBzdHJpbmc7XG4gIHJlYWRvbmx5IGFwaUtleT86IHN0cmluZztcbiAgcmVhZG9ubHkgYXBpS21zS2V5Pzogc3RyaW5nO1xuICByZWFkb25seSBlbmFibGVEYXRhZG9nVHJhY2luZz86IGJvb2xlYW47XG4gIHJlYWRvbmx5IGluamVjdExvZ0NvbnRleHQ/OiBib29sZWFuO1xufVxuXG5leHBvcnQgY2xhc3MgRGF0YWRvZyBleHRlbmRzIGNkay5Db25zdHJ1Y3Qge1xuICBzY29wZTogY2RrLkNvbnN0cnVjdDtcbiAgcHJvcHM6IERhdGFkb2dQcm9wcztcbiAgdHJhbnNwb3J0OiBUcmFuc3BvcnQ7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogRGF0YWRvZ1Byb3BzKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52LkREX0NPTlNUUlVDVF9ERUJVR19MT0dTID09IFwidHJ1ZVwiKSBsb2cuc2V0TGV2ZWwoXCJkZWJ1Z1wiKTtcbiAgICBzdXBlcihzY29wZSwgaWQpO1xuICAgIHRoaXMuc2NvcGUgPSBzY29wZTtcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgdmFsaWRhdGVQcm9wcyh0aGlzLnByb3BzKTtcbiAgICB0aGlzLnRyYW5zcG9ydCA9IG5ldyBUcmFuc3BvcnQoXG4gICAgICB0aGlzLnByb3BzLmZsdXNoTWV0cmljc1RvTG9ncyxcbiAgICAgIHRoaXMucHJvcHMuc2l0ZSxcbiAgICAgIHRoaXMucHJvcHMuYXBpS2V5LFxuICAgICAgdGhpcy5wcm9wcy5hcGlLbXNLZXksXG4gICAgICB0aGlzLnByb3BzLmV4dGVuc2lvbkxheWVyVmVyc2lvbixcbiAgICApO1xuICB9XG5cbiAgcHVibGljIGFkZExhbWJkYUZ1bmN0aW9ucyhsYW1iZGFGdW5jdGlvbnM6IGxhbWJkYS5GdW5jdGlvbltdKSB7XG4gICAgbGV0IGFkZExheWVycyA9IHRoaXMucHJvcHMuYWRkTGF5ZXJzO1xuICAgIGxldCBlbmFibGVEYXRhZG9nVHJhY2luZyA9IHRoaXMucHJvcHMuZW5hYmxlRGF0YWRvZ1RyYWNpbmc7XG4gICAgbGV0IGluamVjdExvZ0NvbnRleHQgPSB0aGlzLnByb3BzLmluamVjdExvZ0NvbnRleHQ7XG4gICAgaWYgKGFkZExheWVycyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBsb2cuZGVidWcoYE5vIHZhbHVlIHByb3ZpZGVkIGZvciBhZGRMYXllcnMsIGRlZmF1bHRpbmcgdG8gJHtkZWZhdWx0RW52VmFyLmFkZExheWVyc31gKTtcbiAgICAgIGFkZExheWVycyA9IGRlZmF1bHRFbnZWYXIuYWRkTGF5ZXJzO1xuICAgIH1cbiAgICBpZiAoZW5hYmxlRGF0YWRvZ1RyYWNpbmcgPT09IHVuZGVmaW5lZCkge1xuICAgICAgbG9nLmRlYnVnKGBObyB2YWx1ZSBwcm92aWRlZCBmb3IgZW5hYmxlRGF0YWRvZ1RyYWNpbmcsIGRlZmF1bHRpbmcgdG8gJHtkZWZhdWx0RW52VmFyLmVuYWJsZURhdGFkb2dUcmFjaW5nfWApO1xuICAgICAgZW5hYmxlRGF0YWRvZ1RyYWNpbmcgPSBkZWZhdWx0RW52VmFyLmVuYWJsZURhdGFkb2dUcmFjaW5nO1xuICAgIH1cbiAgICBpZiAoaW5qZWN0TG9nQ29udGV4dCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBsb2cuZGVidWcoYE5vIHZhbHVlIHByb3ZpZGVkIGZvciBpbmplY3RMb2dDb250ZXh0LCBkZWZhdWx0aW5nIHRvICR7ZGVmYXVsdEVudlZhci5pbmplY3RMb2dDb250ZXh0fWApO1xuICAgICAgaW5qZWN0TG9nQ29udGV4dCA9IGRlZmF1bHRFbnZWYXIuaW5qZWN0TG9nQ29udGV4dDtcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvcHMgIT09IHVuZGVmaW5lZCAmJiBsYW1iZGFGdW5jdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgcmVnaW9uID0gYCR7bGFtYmRhRnVuY3Rpb25zWzBdLmVudi5yZWdpb259YDtcbiAgICAgIGxvZy5kZWJ1ZyhgVXNpbmcgcmVnaW9uOiAke3JlZ2lvbn1gKTtcbiAgICAgIGFwcGx5TGF5ZXJzKFxuICAgICAgICB0aGlzLnNjb3BlLFxuICAgICAgICByZWdpb24sXG4gICAgICAgIGxhbWJkYUZ1bmN0aW9ucyxcbiAgICAgICAgdGhpcy5wcm9wcy5weXRob25MYXllclZlcnNpb24sXG4gICAgICAgIHRoaXMucHJvcHMubm9kZUxheWVyVmVyc2lvbixcbiAgICAgICAgdGhpcy5wcm9wcy5leHRlbnNpb25MYXllclZlcnNpb24sXG4gICAgICApO1xuICAgICAgcmVkaXJlY3RIYW5kbGVycyhsYW1iZGFGdW5jdGlvbnMsIGFkZExheWVycyk7XG4gICAgICBpZiAodGhpcy5wcm9wcy5mb3J3YXJkZXJBcm4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsb2cuZGVidWcoYEFkZGluZyBsb2cgc3Vic2NyaXB0aW9ucyB1c2luZyBwcm92aWRlZCBGb3J3YXJkZXIgQVJOOiAke3RoaXMucHJvcHMuZm9yd2FyZGVyQXJufWApO1xuICAgICAgICBhZGRGb3J3YXJkZXIodGhpcy5zY29wZSwgbGFtYmRhRnVuY3Rpb25zLCB0aGlzLnByb3BzLmZvcndhcmRlckFybik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsb2cuZGVidWcoXCJGb3J3YXJkZXIgQVJOIG5vdCBwcm92aWRlZCwgbm8gbG9nIGdyb3VwIHN1YnNjcmlwdGlvbnMgd2lsbCBiZSBhZGRlZFwiKTtcbiAgICAgIH1cbiAgICAgIGFwcGx5RW52VmFyaWFibGVzKGxhbWJkYUZ1bmN0aW9ucywgZW5hYmxlRGF0YWRvZ1RyYWNpbmcsIGluamVjdExvZ0NvbnRleHQpO1xuXG4gICAgICB0aGlzLnRyYW5zcG9ydC5hcHBseUVudlZhcnMobGFtYmRhRnVuY3Rpb25zKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVQcm9wcyhwcm9wczogRGF0YWRvZ1Byb3BzKSB7XG4gIGxvZy5kZWJ1ZyhcIlZhbGlkYXRpbmcgcHJvcHMuLi5cIik7XG4gIGNvbnN0IHNpdGVMaXN0OiBzdHJpbmdbXSA9IFtcImRhdGFkb2docS5jb21cIiwgXCJkYXRhZG9naHEuZXVcIiwgXCJ1czMuZGF0YWRvZ2hxLmNvbVwiLCBcImRkb2ctZ292LmNvbVwiXTtcbiAgaWYgKHByb3BzLmFwaUtleSAhPT0gdW5kZWZpbmVkICYmIHByb3BzLmFwaUttc0tleSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQm90aCBgYXBpS2V5YCBhbmQgYGFwaUttc0tleWAgY2Fubm90IGJlIHNldC5cIik7XG4gIH1cblxuICBpZiAocHJvcHMuc2l0ZSAhPT0gdW5kZWZpbmVkICYmICFzaXRlTGlzdC5pbmNsdWRlcyhwcm9wcy5zaXRlLnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgXCJXYXJuaW5nOiBJbnZhbGlkIHNpdGUgVVJMLiBNdXN0IGJlIGVpdGhlciBkYXRhZG9naHEuY29tLCBkYXRhZG9naHEuZXUsIHVzMy5kYXRhZG9naHEuY29tLCBvciBkZG9nLWdvdi5jb20uXCIsXG4gICAgKTtcbiAgfVxuXG4gIGlmIChwcm9wcy5hcGlLZXkgPT09IHVuZGVmaW5lZCAmJiBwcm9wcy5hcGlLbXNLZXkgPT09IHVuZGVmaW5lZCAmJiBwcm9wcy5mbHVzaE1ldHJpY3NUb0xvZ3MgPT09IGZhbHNlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiV2hlbiBgZmx1c2hNZXRyaWNzVG9Mb2dzYCBpcyBmYWxzZSwgYGFwaUtleWAgb3IgYGFwaUttc0tleWAgbXVzdCBhbHNvIGJlIHNldC5cIik7XG4gIH1cblxuICBpZiAocHJvcHMuZXh0ZW5zaW9uTGF5ZXJWZXJzaW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICBpZiAocHJvcHMuZm9yd2FyZGVyQXJuICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImBleHRlbnNpb25MYXllclZlcnNpb25gIGFuZCBgZm9yd2FyZGVyQXJuYCBjYW5ub3QgYmUgc2V0IGF0IHRoZSBzYW1lIHRpbWUuXCIpO1xuICAgIH1cbiAgICBpZiAocHJvcHMuYXBpS2V5ID09PSB1bmRlZmluZWQgJiYgcHJvcHMuYXBpS21zS2V5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIldoZW4gYGV4dGVuc2lvbkxheWVyYCBpcyBzZXQsIGBhcGlLZXlgIG9yIGBhcGlLbXNLZXlgIG11c3QgYWxzbyBiZSBzZXQuXCIpO1xuICAgIH1cbiAgfVxufVxuIl19