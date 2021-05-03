// noinspection SpellCheckingInspection


/**
 * 使用方法:
 * 1. 进入地下城地图, 然后按F12打开控制台(Console), 将这些代码粘贴进去即可开始使用
 * 2. 寻找怪物, 进行战斗, 控制台会显示选择器, 在控制台中输入a b c选择,如果拿不准,就选skip. 注意不要点击答题对话框,否则容易出现错乱
 * 3. 如果再次遇到原题, 程序将自动选择
 * 4. 使用时间越久, 自动化程度越高, 你也可以去下载题库(https://github.com/alan-best/box3-share-code/blob/main/%E5%85%B6%E4%BB%96/%E5%9C%B0%E4%B8%8B%E5%9F%8E%E9%A2%98%E5%BA%93.js)
 * 5. 如果出现错乱, 刷新页面即可
 *
 * 版权归 Alan_Best 所有, 请勿随意转载
 *
 *
 */
console.log("地下城外挂已开启");
console.info("Script by Alan_Best","text-shadow:2px 2px 0 #eee;color:#139eff");
function main() {
  let dialog = document.querySelector("._3jDd_WxlRxgzIRrg58zLFo");
  if (!dialog) return setTimeout(main, 100);
  let dialogContent = dialog.querySelector("div").innerText.split("\n")[0];
  let dialogSelects = dialog.querySelectorAll(".GjXxM1DCq_ffiC7NBnfMa._2URGKFZ7--uVo_vDpFNGxk._2x2k1tEiuyNeNRlaHFnMnO._2URGKFZ7--uVo_vDpFNGxk")
  if (!dialogSelects || dialogSelects.length === 0) return setTimeout(main, 100);
  let autoSelect = false
  if (localStorage.getItem("t_" + dialogContent)) {
    dialogSelects.forEach(i => {
      if (i.innerText === localStorage.getItem("t_" + dialogContent)) {
        i.click();
        autoSelect = true
      }
    })
  }
  if (autoSelect) {
    return setTimeout(main, 500)
  }
  console.clear();
  console.group("选择")
  console.info(dialogContent);
  console.log(`a: ${dialogSelects[0].innerText}`);
  dialogSelects[1] && console.log(`b: ${dialogSelects[1].innerText}`);
  dialogSelects[2] && console.log(`c: ${dialogSelects[2].innerText}`)
  console.info("使用a/b/c/skip来选择");
  console.groupEnd();

  function s(v) {
    localStorage.setItem("t_" + dialogContent, dialogSelects[{a: 0, b: 1, c: 2}[v]].innerText);
    console.info("已选择");
    setTimeout(main, 10);
  }

  Object.defineProperty(window, "a", {
    get() {
      s("a")
    }, configurable: true
  });
  Object.defineProperty(window, "b", {
    get() {
      s("b")
    },
    configurable: true
  });
  Object.defineProperty(window, "c", {
    get() {
      s("c")
    },
    configurable: true
  });
  Object.defineProperty(window, "skip", {
    get() {
      setTimeout(main, 1)
    },
    configurable: true
  });
}
main()
