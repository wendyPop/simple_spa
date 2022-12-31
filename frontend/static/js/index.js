import Home from "./pages/Home.js";
import Posts from "./pages/Posts.js";
import Settings from "./pages/Setting.js";
import NotFound from "./pages/NotFound.js";

const routes = [
  {path: "/", view: () => Home },
  {path: "/posts", view: () => Posts },
  {path: "/settings", view: () => Settings}
]

const router = async () => {
  const pageMatches = routes.map((route) => {
	return {
	  route,
	  isMatch: route.path === location.pathname,
	}
  })
  // 현재 path 에 맞는 라우트 매치
  let match = pageMatches.find((pageMatch) => pageMatch.isMatch);
  if (!match) {
	// 없으면 not found 회사
	const page = new NotFound();
	document.querySelector("#root").innerHTML = await page.getHtml();
  } else {
	let view = match.route.view();
	const page = new view;
	document.querySelector("#root").innerHTML = await page.getHtml();
  }
}


// 돔로드 훅
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
	if (e.target.matches("[data-link]")) {
	  e.preventDefault()
	  history.pushState(null, null, e.target.href);
	  router();
	}
  });
  router();
});

window.addEventListener("popstate", () => {
  router();
})
