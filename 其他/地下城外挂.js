// noinspection SpellCheckingInspection,NonAsciiCharacters


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
if (window.DUNGEON_HELPER_INSTALLED) {
  throw new Error("不能重复执行脚本")
}
window.DUNGEON_HELPER_INSTALLED = true;
window.autoSelectNum = 0
window.selectNum = 0;
window.problemsStat = {}
console.clear();
console.group("信息");
console.log("%c地下城外挂已开启", "color: red;font-size:20px;text-shadow:0 0 3px");
console.log("%cScript by Alan_Best", "text-shadow:2px 2px 0 #eee;color:#139eff");
console.groupEnd();
console.group("帮助");
console.log("%c进行战斗答题时, 此脚本将会生效", "text-shadow:2px 2px 0 #eee;color:#139eff");
console.log("%c如果遇到题库中没有的题目, 则会在控制台出现选项, 你需要在控制台选择正确答案(或者选择skip跳过), 然后就会记录进题库", "text-shadow:2px 2px 0 #eee;color:#139eff");
console.log("%c如果出现错乱, 请刷新页面", "text-shadow:2px 2px 0 #eee;color:#fc8308");
console.groupEnd();
console.groupCollapsed("题库操作方法");
console.log("%c使用 mergeProblemsLib(题库数据) 可以更新你的题库", "color:#1e9eff");
console.log("%c使用 exportProblemsLib() 可以分享题库", "color:#1e9eff");
console.log("%c使用 clearProblemsLib() 删除题库", "color:#1e9eff");
console.groupEnd();
console.group("其他");
console.log("%c输入 stat 获取统计(只针对本次脚本运行)", "color:#1e9eff");
console.groupEnd();

function main() {
  let dialog = document.querySelector("._3jDd_WxlRxgzIRrg58zLFo");
  if (!dialog) return setTimeout(main, 1);
  let dialogContent = dialog.querySelector("div").innerText.split("\n")[0];
  let dialogSelects = dialog.querySelectorAll(".GjXxM1DCq_ffiC7NBnfMa._2URGKFZ7--uVo_vDpFNGxk._2x2k1tEiuyNeNRlaHFnMnO._2URGKFZ7--uVo_vDpFNGxk")
  if (!dialogSelects || dialogSelects.length === 0) return setTimeout(main, 100);
  window.problemsStat[dialogContent] ? window.problemsStat[dialogContent]++ : window.problemsStat[dialogContent] = 1;
  let autoSelect = false
  if (localStorage.getItem("t_" + dialogContent)) {
    dialogSelects.forEach(i => {
      if (i.innerText === localStorage.getItem("t_" + dialogContent)) {
        i.click();
        autoSelect = true;
        console.groupCollapsed("执行自动选择");
        console.log("题目: %c" + dialogContent, "color:#eaeaea");
        console.log("自动选择答案: %c" + i.innerText, "color:#aaa");
        console.groupEnd()
      }
    })
  }
  if (autoSelect) {
    window.autoSelectNum++
    return setTimeout(main, 1)
  }
  console.group("手动选择")
  console.info(`%c${dialogContent}`, "color:green");
  console.log(`a: ${dialogSelects[0].innerText}`);
  dialogSelects[1] && console.log(`b: ${dialogSelects[1].innerText}`);
  dialogSelects[2] && console.log(`c: ${dialogSelects[2].innerText}`)
  console.info("%c使用a/b/c/skip来选择", "color:#1e9eff");
  console.groupEnd();


  function s(v) {
    localStorage.setItem("t_" + dialogContent, dialogSelects[{a: 0, b: 1, c: 2}[v]].innerText);
    console.info("%c已记录到题库", "color:#34A853;");
    window.selectNum++
    setTimeout(main, 1);
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

main();
Object.defineProperty(window, "mergeProblemsLib", {
  configurable: true,
  value: (json) => {
    try {
      let oldLength = localStorage.length
      Object.assign(localStorage, JSON.parse(json));
      console.log(`%c题库新增${localStorage.length - oldLength}条数据`, "color:#34A853")
    } catch (e) {
      console.error("合并题库时出错: " + e)

    }
  }
})
Object.defineProperty(window, "exportProblemsLib", {
  configurable: true,
  value: () => {
    console.group("题库导出数据");
    console.log("`" + JSON.stringify(localStorage).replace(/\\"/g, `\\\\"`) + "`");
    console.log("复制上方数据(或者点击COPY)")
    console.groupEnd()
  }
});
Object.defineProperty(window, "clearProblemsLib", {
  configurable: true,
  value: (b) => {
    if (!b) {
      console.warn("此操作会完全清空你的所有题库, 请谨慎考虑. 如果确实要执行, 请使用 clearProblemsLib(true)")
    } else {
      localStorage.clear();
      console.warn("已清空题库")
    }
  }
})
Object.defineProperty(window, "stat", {
  get() {
    console.group("统计信息")
    console.group("答题方式")
    console.table({
      "手动": window.selectNum,
      "自动": window.autoSelectNum,
      "自动化比率": window.autoSelectNum / (window.selectNum + window.autoSelectNum)
    })
    console.groupEnd();
    console.groupCollapsed("题目出现次数");
    console.table(window.problemsStat);
    console.groupEnd()
    console.groupEnd();
  },
  configurable: true
});
void 0;
