import { useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(null);
  const [requestError, setRequestError] = useState(null);

  // to send a post request this assumes you expect json
  const sendRequest = async (options, manipulate) => {
    try {
      setIsLoading(true);
      const rawData = await fetch(options.url, {
        method: options.method ? options.method : "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: options.Authorization ? options.Authorization : null,
        },
        body:
          options.method.toUpperCase() !== "GET"
            ? JSON.stringify({
                ...options.body,
              })
            : null,
      });

      if (!rawData.ok) {
        throw new Error("Credenciales incorrectas.");
      }

      const data = await rawData.json();
      setIsLoading(false);

      if (data) {
        manipulate(data);
      } else {
        throw new Error("No data.");
      }
    } catch (err) {
      setIsLoading(false);
      setRequestError(err);
    }
  };

  return { isLoading, requestError, sendRequest };
};

export default useHttp;
