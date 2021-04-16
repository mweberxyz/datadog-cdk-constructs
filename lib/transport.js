"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transport = exports.transportDefaults = exports.logForwardingEnvVar = exports.siteURLEnvVar = exports.apiKeyKMSEnvVar = exports.apiKeyEnvVar = void 0;
const JSII_RTTI_SYMBOL_1 = Symbol.for("jsii.rtti");
const loglevel_1 = require("loglevel");
exports.apiKeyEnvVar = "DD_API_KEY";
exports.apiKeyKMSEnvVar = "DD_KMS_API_KEY";
exports.siteURLEnvVar = "DD_SITE";
exports.logForwardingEnvVar = "DD_FLUSH_TO_LOG";
exports.transportDefaults = {
    site: "datadoghq.com",
    flushMetricsToLogs: true,
    enableDatadogTracing: true,
};
/**
 * @stability stable
 */
class Transport {
    /**
     * @stability stable
     */
    constructor(flushMetricsToLogs, site, apiKey, apiKmsKey, extensionLayerVersion) {
        if (flushMetricsToLogs === undefined) {
            loglevel_1.default.debug(`No value provided for flushMetricsToLogs, defaulting to ${exports.transportDefaults.flushMetricsToLogs}`);
            this.flushMetricsToLogs = exports.transportDefaults.flushMetricsToLogs;
        }
        else {
            this.flushMetricsToLogs = flushMetricsToLogs;
        }
        this.extensionLayerVersion = extensionLayerVersion;
        // If the extension is used, metrics will be submitted via the extension.
        if (this.extensionLayerVersion !== undefined) {
            loglevel_1.default.debug(`Using extension version ${this.extensionLayerVersion}, metrics will be submitted via the extension`);
            this.flushMetricsToLogs = false;
        }
        if (site === undefined) {
            loglevel_1.default.debug(`No value provided for site, defaulting to ${exports.transportDefaults.site}`);
            this.site = exports.transportDefaults.site;
        }
        else {
            this.site = site;
        }
        this.apiKey = apiKey;
        this.apiKmsKey = apiKmsKey;
    }
    /**
     * @stability stable
     */
    applyEnvVars(lambdas) {
        loglevel_1.default.debug(`Setting Datadog transport environment variables...`);
        lambdas.forEach((lam) => {
            lam.addEnvironment(exports.logForwardingEnvVar, this.flushMetricsToLogs.toString());
            if (this.site !== undefined && this.flushMetricsToLogs === false) {
                lam.addEnvironment(exports.siteURLEnvVar, this.site);
            }
            if (this.apiKey !== undefined) {
                lam.addEnvironment(exports.apiKeyEnvVar, this.apiKey);
            }
            if (this.apiKmsKey !== undefined) {
                lam.addEnvironment(exports.apiKeyKMSEnvVar, this.apiKmsKey);
            }
        });
    }
}
exports.Transport = Transport;
_a = JSII_RTTI_SYMBOL_1;
Transport[_a] = { fqn: "datadog-cdk-constructs.Transport", version: "0.2.0" };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNwb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3RyYW5zcG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQVNBLHVDQUEyQjtBQUVkLFFBQUEsWUFBWSxHQUFHLFlBQVksQ0FBQztBQUM1QixRQUFBLGVBQWUsR0FBRyxnQkFBZ0IsQ0FBQztBQUNuQyxRQUFBLGFBQWEsR0FBRyxTQUFTLENBQUM7QUFDMUIsUUFBQSxtQkFBbUIsR0FBRyxpQkFBaUIsQ0FBQztBQUV4QyxRQUFBLGlCQUFpQixHQUFHO0lBQy9CLElBQUksRUFBRSxlQUFlO0lBQ3JCLGtCQUFrQixFQUFFLElBQUk7SUFDeEIsb0JBQW9CLEVBQUUsSUFBSTtDQUMzQixDQUFDOzs7O0FBRUYsTUFBYSxTQUFTOzs7O0lBT3BCLFlBQ0Usa0JBQTRCLEVBQzVCLElBQWEsRUFDYixNQUFlLEVBQ2YsU0FBa0IsRUFDbEIscUJBQThCO1FBRTlCLElBQUksa0JBQWtCLEtBQUssU0FBUyxFQUFFO1lBQ3BDLGtCQUFHLENBQUMsS0FBSyxDQUFDLDJEQUEyRCx5QkFBaUIsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUM7WUFDN0csSUFBSSxDQUFDLGtCQUFrQixHQUFHLHlCQUFpQixDQUFDLGtCQUFrQixDQUFDO1NBQ2hFO2FBQU07WUFDTCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7U0FDOUM7UUFFRCxJQUFJLENBQUMscUJBQXFCLEdBQUcscUJBQXFCLENBQUM7UUFDbkQseUVBQXlFO1FBQ3pFLElBQUksSUFBSSxDQUFDLHFCQUFxQixLQUFLLFNBQVMsRUFBRTtZQUM1QyxrQkFBRyxDQUFDLEtBQUssQ0FBQywyQkFBMkIsSUFBSSxDQUFDLHFCQUFxQiwrQ0FBK0MsQ0FBQyxDQUFDO1lBQ2hILElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7U0FDakM7UUFFRCxJQUFJLElBQUksS0FBSyxTQUFTLEVBQUU7WUFDdEIsa0JBQUcsQ0FBQyxLQUFLLENBQUMsNkNBQTZDLHlCQUFpQixDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFDakYsSUFBSSxDQUFDLElBQUksR0FBRyx5QkFBaUIsQ0FBQyxJQUFJLENBQUM7U0FDcEM7YUFBTTtZQUNMLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1NBQ2xCO1FBRUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDN0IsQ0FBQzs7OztJQUVELFlBQVksQ0FBQyxPQUEwQjtRQUNyQyxrQkFBRyxDQUFDLEtBQUssQ0FBQyxvREFBb0QsQ0FBQyxDQUFDO1FBQ2hFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUN0QixHQUFHLENBQUMsY0FBYyxDQUFDLDJCQUFtQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQzVFLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLGtCQUFrQixLQUFLLEtBQUssRUFBRTtnQkFDaEUsR0FBRyxDQUFDLGNBQWMsQ0FBQyxxQkFBYSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM5QztZQUNELElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUU7Z0JBQzdCLEdBQUcsQ0FBQyxjQUFjLENBQUMsb0JBQVksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDL0M7WUFDRCxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFO2dCQUNoQyxHQUFHLENBQUMsY0FBYyxDQUFDLHVCQUFlLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ3JEO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOztBQXJESCw4QkFzREMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogVW5sZXNzIGV4cGxpY2l0bHkgc3RhdGVkIG90aGVyd2lzZSBhbGwgZmlsZXMgaW4gdGhpcyByZXBvc2l0b3J5IGFyZSBsaWNlbnNlZFxuICogdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlIFZlcnNpb24gMi4wLlxuICpcbiAqIFRoaXMgcHJvZHVjdCBpbmNsdWRlcyBzb2Z0d2FyZSBkZXZlbG9wZWQgYXQgRGF0YWRvZyAoaHR0cHM6Ly93d3cuZGF0YWRvZ2hxLmNvbS8pLlxuICogQ29weXJpZ2h0IDIwMjEgRGF0YWRvZywgSW5jLlxuICovXG5cbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tIFwiQGF3cy1jZGsvYXdzLWxhbWJkYVwiO1xuaW1wb3J0IGxvZyBmcm9tIFwibG9nbGV2ZWxcIjtcblxuZXhwb3J0IGNvbnN0IGFwaUtleUVudlZhciA9IFwiRERfQVBJX0tFWVwiO1xuZXhwb3J0IGNvbnN0IGFwaUtleUtNU0VudlZhciA9IFwiRERfS01TX0FQSV9LRVlcIjtcbmV4cG9ydCBjb25zdCBzaXRlVVJMRW52VmFyID0gXCJERF9TSVRFXCI7XG5leHBvcnQgY29uc3QgbG9nRm9yd2FyZGluZ0VudlZhciA9IFwiRERfRkxVU0hfVE9fTE9HXCI7XG5cbmV4cG9ydCBjb25zdCB0cmFuc3BvcnREZWZhdWx0cyA9IHtcbiAgc2l0ZTogXCJkYXRhZG9naHEuY29tXCIsXG4gIGZsdXNoTWV0cmljc1RvTG9nczogdHJ1ZSxcbiAgZW5hYmxlRGF0YWRvZ1RyYWNpbmc6IHRydWUsXG59O1xuXG5leHBvcnQgY2xhc3MgVHJhbnNwb3J0IHtcbiAgZmx1c2hNZXRyaWNzVG9Mb2dzOiBib29sZWFuO1xuICBzaXRlOiBzdHJpbmc7XG4gIGFwaUtleT86IHN0cmluZztcbiAgYXBpS21zS2V5Pzogc3RyaW5nO1xuICBleHRlbnNpb25MYXllclZlcnNpb24/OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgZmx1c2hNZXRyaWNzVG9Mb2dzPzogYm9vbGVhbixcbiAgICBzaXRlPzogc3RyaW5nLFxuICAgIGFwaUtleT86IHN0cmluZyxcbiAgICBhcGlLbXNLZXk/OiBzdHJpbmcsXG4gICAgZXh0ZW5zaW9uTGF5ZXJWZXJzaW9uPzogbnVtYmVyLFxuICApIHtcbiAgICBpZiAoZmx1c2hNZXRyaWNzVG9Mb2dzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGxvZy5kZWJ1ZyhgTm8gdmFsdWUgcHJvdmlkZWQgZm9yIGZsdXNoTWV0cmljc1RvTG9ncywgZGVmYXVsdGluZyB0byAke3RyYW5zcG9ydERlZmF1bHRzLmZsdXNoTWV0cmljc1RvTG9nc31gKTtcbiAgICAgIHRoaXMuZmx1c2hNZXRyaWNzVG9Mb2dzID0gdHJhbnNwb3J0RGVmYXVsdHMuZmx1c2hNZXRyaWNzVG9Mb2dzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZsdXNoTWV0cmljc1RvTG9ncyA9IGZsdXNoTWV0cmljc1RvTG9ncztcbiAgICB9XG5cbiAgICB0aGlzLmV4dGVuc2lvbkxheWVyVmVyc2lvbiA9IGV4dGVuc2lvbkxheWVyVmVyc2lvbjtcbiAgICAvLyBJZiB0aGUgZXh0ZW5zaW9uIGlzIHVzZWQsIG1ldHJpY3Mgd2lsbCBiZSBzdWJtaXR0ZWQgdmlhIHRoZSBleHRlbnNpb24uXG4gICAgaWYgKHRoaXMuZXh0ZW5zaW9uTGF5ZXJWZXJzaW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGxvZy5kZWJ1ZyhgVXNpbmcgZXh0ZW5zaW9uIHZlcnNpb24gJHt0aGlzLmV4dGVuc2lvbkxheWVyVmVyc2lvbn0sIG1ldHJpY3Mgd2lsbCBiZSBzdWJtaXR0ZWQgdmlhIHRoZSBleHRlbnNpb25gKTtcbiAgICAgIHRoaXMuZmx1c2hNZXRyaWNzVG9Mb2dzID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHNpdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgbG9nLmRlYnVnKGBObyB2YWx1ZSBwcm92aWRlZCBmb3Igc2l0ZSwgZGVmYXVsdGluZyB0byAke3RyYW5zcG9ydERlZmF1bHRzLnNpdGV9YCk7XG4gICAgICB0aGlzLnNpdGUgPSB0cmFuc3BvcnREZWZhdWx0cy5zaXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNpdGUgPSBzaXRlO1xuICAgIH1cblxuICAgIHRoaXMuYXBpS2V5ID0gYXBpS2V5O1xuICAgIHRoaXMuYXBpS21zS2V5ID0gYXBpS21zS2V5O1xuICB9XG5cbiAgYXBwbHlFbnZWYXJzKGxhbWJkYXM6IGxhbWJkYS5GdW5jdGlvbltdKSB7XG4gICAgbG9nLmRlYnVnKGBTZXR0aW5nIERhdGFkb2cgdHJhbnNwb3J0IGVudmlyb25tZW50IHZhcmlhYmxlcy4uLmApO1xuICAgIGxhbWJkYXMuZm9yRWFjaCgobGFtKSA9PiB7XG4gICAgICBsYW0uYWRkRW52aXJvbm1lbnQobG9nRm9yd2FyZGluZ0VudlZhciwgdGhpcy5mbHVzaE1ldHJpY3NUb0xvZ3MudG9TdHJpbmcoKSk7XG4gICAgICBpZiAodGhpcy5zaXRlICE9PSB1bmRlZmluZWQgJiYgdGhpcy5mbHVzaE1ldHJpY3NUb0xvZ3MgPT09IGZhbHNlKSB7XG4gICAgICAgIGxhbS5hZGRFbnZpcm9ubWVudChzaXRlVVJMRW52VmFyLCB0aGlzLnNpdGUpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuYXBpS2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbGFtLmFkZEVudmlyb25tZW50KGFwaUtleUVudlZhciwgdGhpcy5hcGlLZXkpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuYXBpS21zS2V5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbGFtLmFkZEVudmlyb25tZW50KGFwaUtleUtNU0VudlZhciwgdGhpcy5hcGlLbXNLZXkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=