class UrlBuilder {
  baseUrl: string;
  queryParameters: { [key: string]: string[] } = {};

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  addQueryParameter(parameterName: string, parameter: string[]) {
    this.queryParameters[parameterName] = parameter;
    return this;
  }

  buildUrl() {
    let encodedParameters = this.encodeParameters();

    return `${this.baseUrl}?${encodedParameters}`;
  }

  encodeParameters() {
    let encodedParameters = [];

    for (let name of Object.keys(this.queryParameters)) {
      const encodedParameter = encodeURIComponent(
        this.queryParameters[name].join(",")
      );
      encodedParameters.push(`${name}=${encodedParameter}`);
    }

    return encodedParameters.join("&");
  }
}

export default UrlBuilder;
