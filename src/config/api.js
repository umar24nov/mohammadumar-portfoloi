const API_BASE = process.env.REACT_APP_API_URL || "/api";

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;

  const config = {
    headers: { "Content-Type": "application/json" },
    ...options,
  };

  if (config.body && typeof config.body === "object") {
    config.body = JSON.stringify(config.body);
  }

  let res;
  try {
    res = await fetch(url, config);
  } catch {
    throw new Error("Network error. Please try again.");
  }

  let data = {};
  try {
    data = await res.json();
  } catch {
    /* no JSON body */
  }

  if (!res.ok) {
    throw new Error(data.error || `Request failed with status ${res.status}`);
  }

  return data;
}

export const feedbackAPI = {
  submit: (data) => request("/feedback", { method: "POST", body: data }),
};

export const contactAPI = {
  submit: (data) => request("/contact", { method: "POST", body: data }),
};
