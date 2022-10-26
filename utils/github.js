export const postGh = ({ url, cookie, body }) => {
  return $fetch(url, {
    method: "POST",
    baseURL: "https://api.github.com",
    body,
    headers: {
      accept: "application/vnd.github+json",
      Authorization: `Bearer ${cookie}`,
    },
  });
};

export const fetchGh = ({ url, cookie }) => {
  return $fetch(url, {
    baseURL: "https://api.github.com",
    headers: {
      Authorization: `token ${cookie}`,
    },
  });
};
