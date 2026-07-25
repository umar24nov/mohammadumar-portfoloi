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

  const res = await fetch(url, config);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || `Request failed with status ${res.status}`);
  }

  return data;
}

export const feedbackAPI = {
  submit: (data) => request("/feedback", { method: "POST", body: data }),
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/feedback${query ? `?${query}` : ""}`);
  },
  updateStatus: (id, status) =>
    request(`/feedback/${id}/status`, {
      method: "PATCH",
      body: { status },
    }),
};

export const contactAPI = {
  submit: (data) => request("/contact", { method: "POST", body: data }),
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/contact${query ? `?${query}` : ""}`);
  },
  updateStatus: (id, status) =>
    request(`/contact/${id}/status`, {
      method: "PATCH",
      body: { status },
    }),
};

export const statsAPI = {
  trackVisitor: (path) =>
    request("/stats/visitor", { method: "POST", body: { path } }),
  getStats: () => request("/stats/stats"),
  getActivity: () => request("/stats/activity"),
};
