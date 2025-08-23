import { Github, MapPin, Linkedin } from "lucide-react";
import { Skill } from "../../types";

interface AboutPageProps {
  isDark: boolean;
  currentLang: string;
  t: any;
  skills: Skill[];
}

export const AboutPage = ({
  isDark,
  currentLang,
  t,
  skills,
}: AboutPageProps) => {
  return (
    <div className="space-y-12">
      {/* 히어로 섹션 */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          {/* 메인 배경 원형 요소들 */}
          <div
            className={`absolute top-20 right-20 w-32 h-32 rounded-full ${
              isDark ? "bg-yellow-500" : "bg-amber-400"
            } blur-3xl`}
          ></div>
          <div
            className={`absolute bottom-20 left-20 w-40 h-40 rounded-full ${
              isDark ? "bg-green-500" : "bg-green-400"
            } blur-3xl`}
          ></div>

          {/* 추가 배경 요소들 */}
          <div
            className={`absolute top-1/3 left-1/4 w-24 h-24 rounded-full ${
              isDark ? "bg-blue-500" : "bg-blue-300"
            } blur-2xl opacity-60`}
          ></div>
          <div
            className={`absolute bottom-1/3 right-1/4 w-20 h-20 rounded-full ${
              isDark ? "bg-purple-500" : "bg-purple-300"
            } blur-2xl opacity-50`}
          ></div>

          {/* 그라데이션 오버레이 */}
          <div
            className={`absolute inset-0 ${
              isDark
                ? "bg-gradient-to-br from-slate-900/20 via-transparent to-slate-800/30"
                : "bg-gradient-to-br from-amber-50/40 via-transparent to-green-50/50"
            }`}
          ></div>
        </div>

        <div className="relative z-10 text-center py-20">
          <p
            className={`text-lg mb-2 ${
              isDark ? "text-yellow-300" : "text-amber-600"
            } font-light`}
          >
            {t.about.greeting}
          </p>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            {t.about.name}
          </h1>
          <p
            className={`text-xl md:text-2xl mb-6 ${
              isDark ? "text-gray-300" : "text-gray-700"
            } font-light`}
          >
            {t.about.jobTitle}
          </p>
          <p
            className={`text-base md:text-lg max-w-2xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-600"
            } leading-relaxed`}
          >
            {t.about.description}
          </p>
        </div>
      </section>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* 기술 스택 */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">{t.about.skills}</h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill.name}
                className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-colors ${
                  isDark
                    ? "bg-gray-800/50 border-gray-600 text-gray-300 hover:border-yellow-500"
                    : "bg-white/60 border-gray-300 text-gray-700 hover:border-amber-500"
                }`}
                style={{
                  borderColor: skill.color,
                }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        {/* 경험 & 연락처 */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-6">
              {t.about.experience}
            </h2>
            <div
              className={`p-6 rounded-xl border ${
                isDark
                  ? "bg-gray-800/30 border-gray-700"
                  : "bg-white/60 border-gray-200"
              }`}
            >
              <p
                className={`${
                  isDark ? "text-gray-300" : "text-gray-700"
                } leading-relaxed`}
              >
                {currentLang === "ko"
                  ? "빠른 학습능력과 실용적 접근으로 프론트엔드 개발에 집중하고 있습니다. 사용자 중심의 인터페이스 설계와 성능 최적화에 관심이 많으며, 협업과 소통을 통해 더 나은 제품을 만들어가는 것을 좋아합니다."
                  : "Focusing on frontend development with quick learning ability and practical approach. Interested in user-centered interface design and performance optimization, and enjoy creating better products through collaboration and communication."}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6">{t.about.contact}</h2>
            <div className="space-y-3">
              <a
                href="https://www.linkedin.com/in/sol-lee-namoo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:opacity-80 transition-opacity"
              >
                <Linkedin
                  className={`w-5 h-5 mr-3 ${
                    isDark ? "text-blue-400" : "text-blue-600"
                  }`}
                />
                <span>linkedin.com/in/sol-lee-namoo</span>
              </a>
              <a
                href="https://github.com/sol-namoo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:opacity-80 transition-opacity"
              >
                <Github
                  className={`w-5 h-5 mr-3 ${
                    isDark ? "text-green-400" : "text-green-600"
                  }`}
                />
                <span>github.com/sol-namoo</span>
              </a>
              <div className="flex items-center">
                <MapPin
                  className={`w-5 h-5 mr-3 ${
                    isDark ? "text-yellow-400" : "text-amber-600"
                  }`}
                />
                <span>London, UK</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
