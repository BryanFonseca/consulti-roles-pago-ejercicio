import { useState, useEffect } from "react";

const useHttp = async (initialUrl, initialOptions) => {
  const [url, setUrl] = useState(initialUrl);
  const [options, setOptions] = useState(initialOptions);
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(undefined);

    async function fetchData() {
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setData(json);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    }
    fetchData();
  }, [url, options]);

  return { data, error, loading, setUrl, setOptions };
};

export default useHttp;
