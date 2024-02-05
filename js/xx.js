async function unConfirmAsis(id) {
  const response = await fetch(`${URL}/${id}`);
  const data = await response.json();
  const isUserInList = data.confirmed.some((user) => user.userId === cache);
  const isUserInUnconfirmed = data.unconfirmed.some(
    (user) => user.userId === cache
  );
  if (isUserInList && !isUserInUnconfirmed) {
    const newAsist = [...data.confirmed];
    const newlist = newAsist.filter((user) => user.userId !== cache);
    console.log(newlist);
    await fetch(`${URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ confirmed: newlist }),
    });
    const newNotAsist = [...data.unconfirmed, { userId: cache }];
    await fetch(`${URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ confirmed: newNotAsist }),
    });
  }
}
