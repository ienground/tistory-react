import { useEffect, useState } from "react";
import { convertedVariables } from "constants/index";
import { replaceTistoryVariable } from "utils";

export interface PageRouteItem {
  id: string;
  name: string;
  route: string;
}

export const PAGE_ROUTES: PageRouteItem[] = [
  { id: "main", name: "메인 / 목록", route: "/main" },
  { id: "article", name: "포스트 상세", route: "/article" },
  { id: "page", name: "샘플 페이지", route: "/page" },
  { id: "notice", name: "공지사항", route: "/notice" },
  { id: "guest", name: "방명록", route: "/guest" },
  { id: "protected", name: "보호글", route: "/protected" },
  { id: "tags", name: "태그 목록", route: "/tags" },
  { id: "cover", name: "홈 커버", route: "/cover" },
  { id: "local", name: "로컬로그", route: "/local" },
];

export const DevTools = () => {
  const [enableVariableSwap, setEnableVariableSwap] = useState(true);
  const [activeTab, setActiveTab] = useState<"variables" | "preview" | "info">("variables");
  const [openPopup, setOpen] = useState(false);
  const [replacedCount, setReplacedCount] = useState(0);
  const [currentPath, setCurrentPath] = useState<string>(
    typeof window !== "undefined" ? window.location.pathname : "/"
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  const navigateTo = (targetPath: string) => {
    if (typeof window === "undefined") return;
    const cleanPath = targetPath.startsWith("/") ? targetPath : `/${targetPath}`;
    if (window.location.pathname === cleanPath) return;

    window.history.pushState({}, "", cleanPath);
    window.dispatchEvent(new Event("popstate"));
    setCurrentPath(cleanPath);
  };

  useEffect(() => {
    const isEnvEnabled =
      process.env.__ENABLE_VARIABLE_SWAP___ !== undefined
        ? Boolean(process.env.__ENABLE_VARIABLE_SWAP___)
        : true;

    if (!enableVariableSwap || !isEnvEnabled) return;

    const rootElement = document.getElementById("root");
    if (rootElement) {
      const AllNodes = rootElement.querySelectorAll("*");
      AllNodes.forEach((node) => {
        replaceTistoryVariable(node, convertedVariables);
      });
      setReplacedCount(convertedVariables.size);
    }
  }, [enableVariableSwap]);

  const activePageItem = PAGE_ROUTES.find(
    (p) => p.route === currentPath || (currentPath === "/" && p.route === "/main")
  );

  return (
    <div className="tistory-react-devtools fixed bottom-[24px] right-[24px] z-[999999] [font-family:system-ui,-apple-system,sans-serif] [font-size:14px] [line-height:1.5] text-slate-100 antialiased select-none">
      {!openPopup ? (
        <button
          type="button"
          aria-label="Tistory DevTools 열기"
          onClick={() => setOpen(true)}
          className="group relative flex items-center justify-center w-[52px] h-[52px] rounded-[16px] bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/40 text-indigo-400 shadow-xl shadow-indigo-950/50 hover:scale-105 hover:border-indigo-400/70 hover:text-white transition-all duration-200 active:scale-95 cursor-pointer"
        >
          <span className="absolute -top-[2px] -right-[2px] flex h-[10px] w-[10px]">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-[10px] w-[10px] bg-indigo-500" />
          </span>
          <svg
            className="w-[24px] h-[24px] transition-transform duration-200 group-hover:rotate-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
        </button>
      ) : (
        <div className="w-[360px] h-[480px] flex flex-col bg-slate-950/95 border border-slate-800 rounded-[20px] shadow-2xl backdrop-blur-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-[16px] py-[12px] bg-slate-900/80 border-b border-slate-800/80">
            <div className="flex items-center gap-[10px]">
              <div className="flex items-center justify-center w-[28px] h-[28px] rounded-[8px] bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                <svg
                  className="w-[16px] h-[16px]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-[6px]">
                  <span className="[font-size:14px] font-bold tracking-tight text-white">
                    DevTools
                  </span>
                  <span className="px-[6px] py-[1px] [font-size:10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-[4px]">
                    v0.1.0
                  </span>
                </div>
                <p className="[font-size:11px] text-slate-400">
                  Tistory-React Framework
                </p>
              </div>
            </div>

            <div className="flex items-center gap-[8px]">
              {/* Quick Page Dropdown */}
              <select
                value={activePageItem ? activePageItem.route : "custom"}
                onChange={(e) => {
                  if (e.target.value !== "custom") {
                    navigateTo(e.target.value);
                  }
                }}
                aria-label="페이지 이동"
                className="px-[8px] py-[4px] [font-size:11px] font-medium bg-slate-900 text-indigo-300 border border-indigo-500/40 rounded-[6px] outline-none cursor-pointer hover:bg-slate-800 hover:border-indigo-400 transition-colors max-w-[125px] truncate"
              >
                {PAGE_ROUTES.map((p) => (
                  <option key={p.route} value={p.route}>
                    {p.name}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-[28px] h-[28px] flex items-center justify-center rounded-[8px] text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
              >
                <svg
                  className="w-[16px] h-[16px]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex p-[6px] gap-[4px] bg-slate-900/40 border-b border-slate-800/60">
            <button
              type="button"
              onClick={() => setActiveTab("variables")}
              className={`flex-1 py-[6px] px-[10px] rounded-[10px] [font-size:12px] font-medium transition-all cursor-pointer ${
                activeTab === "variables"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/40"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
              }`}
            >
              치환자
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`flex-1 py-[6px] px-[10px] rounded-[10px] [font-size:12px] font-medium transition-all cursor-pointer ${
                activeTab === "preview"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/40"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
              }`}
            >
              미리보기
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("info")}
              className={`flex-1 py-[6px] px-[10px] rounded-[10px] [font-size:12px] font-medium transition-all cursor-pointer ${
                activeTab === "info"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/40"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
              }`}
            >
              정보
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-[14px] space-y-[12px]">
            {activeTab === "variables" && (
              <>
                <div className="p-[12px] rounded-[12px] bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="[font-size:13px] font-semibold text-slate-200">
                      치환자 변환
                    </span>
                    <p className="[font-size:11px] text-slate-400 mt-[1px]">
                      테스트용 치환자 자동 치환
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEnableVariableSwap(!enableVariableSwap)}
                    className={`relative inline-flex h-[22px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      enableVariableSwap ? "bg-indigo-600" : "bg-slate-700"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                        enableVariableSwap
                          ? "translate-x-[18px]"
                          : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                <div className="p-[12px] rounded-[12px] bg-slate-900/40 border border-slate-800/60">
                  <div className="flex items-center justify-between mb-[8px]">
                    <span className="[font-size:12px] font-semibold text-slate-300">
                      등록된 치환자
                    </span>
                    <span className="px-[8px] py-[2px] [font-size:11px] font-bold bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20">
                      {replacedCount}개 활성
                    </span>
                  </div>
                  <div className="space-y-[6px]">
                    {Array.from(convertedVariables.entries())
                      .slice(0, 6)
                      .map(([key, val]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between p-[8px] rounded-[8px] bg-slate-950/60 border border-slate-800/40 [font-size:11px]"
                        >
                          <span className="font-mono text-indigo-300 truncate max-w-[150px]">
                            {key}
                          </span>
                          <span className="text-slate-400 truncate max-w-[130px]">
                            {val}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === "preview" && (
              <div className="space-y-[12px]">
                <div className="p-[14px] rounded-[12px] bg-slate-900/60 border border-slate-800/60 text-center">
                  <div className="w-[48px] h-[48px] mx-auto mb-[10px] rounded-[12px] bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <svg
                      className="w-[24px] h-[24px]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h4 className="[font-size:13px] font-semibold text-slate-200">
                    스킨 미리보기
                  </h4>
                  <p className="[font-size:11px] text-slate-400 mt-[4px]">
                    assets 디렉터리의 preview256.png 및 preview560.png 이미지가 스킨 등록 페이지에 표시됩니다.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "info" && (
              <div className="p-[14px] rounded-[12px] bg-slate-900/60 border border-slate-800/60 space-y-[10px]">
                <div className="flex justify-between items-center [font-size:12px] pb-[8px] border-b border-slate-800/60">
                  <span className="text-slate-400">환경</span>
                  <span className="text-emerald-400 font-semibold">
                    Development
                  </span>
                </div>
                <div className="flex justify-between items-center [font-size:12px] pb-[8px] border-b border-slate-800/60">
                  <span className="text-slate-400">프레임워크 버전</span>
                  <span className="text-slate-200 font-mono">
                    0.1.0-alpha.11
                  </span>
                </div>
                <div className="flex justify-between items-center [font-size:12px]">
                  <span className="text-slate-400">빌드 타겟</span>
                  <span className="text-slate-200">Production Excluded</span>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-[16px] py-[10px] bg-slate-900/80 border-t border-slate-800/80 flex items-center justify-between [font-size:11px] text-slate-400">
            <span>Tistory React DevTools</span>
            <span className="text-indigo-400 font-semibold">ienlab</span>
          </div>
        </div>
      )}
    </div>
  );
};
