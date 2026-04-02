import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const IMG_POLLUTION = "https://cdn.poehali.dev/projects/3e92cb31-4d9c-4ae1-b25f-49a26e009221/files/82140463-6ed9-4038-ad50-5a56dd34eab5.jpg";
const IMG_NATURE = "https://cdn.poehali.dev/projects/3e92cb31-4d9c-4ae1-b25f-49a26e009221/files/e7f3a6c1-1536-4b8f-8b46-517e69cb5ce3.jpg";
const IMG_VOLUNTEERS = "https://cdn.poehali.dev/projects/3e92cb31-4d9c-4ae1-b25f-49a26e009221/files/50c887bd-a070-4062-889c-dfaeefb244b7.jpg";

const sections = [
  { id: "hero", label: "Введение" },
  { id: "problem", label: "Проблема" },
  { id: "stats", label: "Статистика" },
  { id: "impact", label: "Влияние" },
  { id: "causes", label: "Причины" },
  { id: "solutions", label: "Решения" },
  { id: "examples", label: "Примеры" },
  { id: "conclusion", label: "Вывод" },
];

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView();
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 20);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count.toLocaleString("ru")}{suffix}</span>;
}

function Section({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView(0.08);
  return (
    <section
      id={id}
      ref={ref}
      className={`min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-28 py-24 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </section>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { threshold: 0.35 }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="font-golos bg-[#f5f0e8] text-[#1a2e1a] overflow-x-hidden">

      {/* Навигация */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f5f0e8]/90 backdrop-blur-sm border-b border-[#2d5a27]/10">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="font-cormorant text-lg font-semibold text-[#2d5a27] leading-tight">
            Экология<br /><span className="text-sm font-normal text-[#4a7c59]">Чулымский район</span>
          </div>
          <div className="hidden lg:flex gap-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeSection === s.id ? "bg-[#2d5a27] text-[#e8f5e2]" : "text-[#4a7c59] hover:bg-[#2d5a27]/10"}`}
              >
                {s.label}
              </button>
            ))}
          </div>
          <button className="lg:hidden p-2 text-[#2d5a27]" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden bg-[#f5f0e8] border-t border-[#2d5a27]/10 px-6 py-3 flex flex-wrap gap-2">
            {sections.map((s) => (
              <button key={s.id} onClick={() => scrollTo(s.id)} className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#2d5a27]/10 text-[#2d5a27]">
                {s.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="min-h-screen relative flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG_NATURE} alt="Природа Сибири" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a2e1a]/70 via-[#1a2e1a]/50 to-[#f5f0e8]" />
        </div>
        <div className="absolute top-20 right-10 text-6xl opacity-20 animate-leaf-sway">🍃</div>
        <div className="absolute bottom-40 left-8 text-4xl opacity-15 animate-leaf-sway" style={{ animationDelay: "1s" }}>🌿</div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-16 lg:px-28 pt-24">
          <div className="inline-flex items-center gap-2 bg-[#2d5a27]/30 backdrop-blur-sm border border-[#e8f5e2]/20 rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs text-[#e8f5e2] font-medium tracking-wider uppercase">Индивидуальный проект · 2026</span>
          </div>
          <h1 className="font-cormorant text-5xl md:text-7xl lg:text-8xl font-bold text-[#e8f5e2] leading-[1.05] mb-4">
            Мусор и экология
          </h1>
          <h2 className="font-cormorant text-3xl md:text-4xl text-[#a8d5a2] italic mb-6">
            Новосибирская область, Чулымский район
          </h2>
          <p className="text-[#d0e8cc] text-lg md:text-xl max-w-2xl leading-relaxed">
            Комплексное исследование экологической ситуации, анализ причин загрязнения и разработка практических решений для сохранения природы родного края
          </p>
          <button
            onClick={() => scrollTo("problem")}
            className="mt-10 inline-flex items-center gap-2 bg-[#2d5a27] hover:bg-[#3d7a37] text-[#e8f5e2] px-8 py-4 rounded-full font-medium transition-all hover:scale-105"
          >
            Перейти к проекту
            <Icon name="ArrowDown" size={18} />
          </button>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={28} className="text-[#e8f5e2]/50" />
        </div>
      </section>

      {/* ПРОБЛЕМА */}
      <Section id="problem" className="bg-[#f5f0e8]">
        <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[#4a7c59] text-sm font-semibold tracking-widest uppercase mb-3 block">01 / Описание проблемы</span>
            <h2 className="font-cormorant text-4xl md:text-5xl font-bold text-[#1a2e1a] mb-6 leading-tight">
              Экологический кризис<br /><span className="text-[#2d5a27]">в нашем районе</span>
            </h2>
            <div className="space-y-4 text-[#3a5a3a] leading-relaxed">
              <p>Чулымский район Новосибирской области — территория богатая реками, лесами и уникальными природными экосистемами. Однако в последние десятилетия экологическая обстановка значительно ухудшилась.</p>
              <p>Несанкционированные свалки, загрязнение реки Чулым и её притоков, бытовой мусор в лесах — всё это стало серьёзной угрозой для природы и здоровья жителей.</p>
              <p>Проблема усугубляется низким уровнем экологической культуры населения, недостаточной инфраструктурой сбора и переработки отходов, а также недостаточным вниманием со стороны властей.</p>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img src={IMG_POLLUTION} alt="Загрязнение" className="w-full h-80 object-cover" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-[#8b2020] text-white rounded-2xl px-6 py-4 shadow-xl">
              <div className="font-cormorant text-3xl font-bold">⚠️</div>
              <div className="text-sm font-medium mt-1">Угроза экосистеме</div>
            </div>
            <div className="absolute -top-4 -right-4 bg-[#2d5a27] text-[#e8f5e2] rounded-2xl px-6 py-4 shadow-xl">
              <div className="font-cormorant text-3xl font-bold">🌊</div>
              <div className="text-sm font-medium mt-1">Река Чулым</div>
            </div>
          </div>
        </div>
      </Section>

      {/* СТАТИСТИКА */}
      <Section id="stats" className="bg-[#1a2e1a]">
        <div className="max-w-6xl mx-auto w-full">
          <span className="text-[#4a7c59] text-sm font-semibold tracking-widest uppercase mb-3 block">02 / Данные и статистика</span>
          <h2 className="font-cormorant text-4xl md:text-5xl font-bold text-[#e8f5e2] mb-12 leading-tight">
            Цифры говорят<br /><span className="text-[#a8d5a2]">сами за себя</span>
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {[
              { value: 47, suffix: "+", label: "Несанкционированных свалок выявлено в районе", icon: "MapPin" },
              { value: 3200, suffix: " т", label: "Твёрдых бытовых отходов образуется ежегодно", icon: "Trash2" },
              { value: 78, suffix: "%", label: "Отходов не проходит переработку или сортировку", icon: "AlertTriangle" },
              { value: 12, suffix: " рек", label: "Водных объектов подвергаются загрязнению", icon: "Waves" },
            ].map((item) => (
              <div key={item.label} className="bg-[#2d5a27]/30 border border-[#4a7c59]/30 rounded-2xl p-6 text-center">
                <Icon name={item.icon as "MapPin"} size={28} className="text-[#a8d5a2] mx-auto mb-3" />
                <div className="font-cormorant text-4xl md:text-5xl font-bold text-[#e8f5e2] mb-2">
                  <AnimatedNumber target={item.value} suffix={item.suffix} />
                </div>
                <div className="text-[#7aad7a] text-sm leading-snug">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: "Состав отходов", items: [["Пластик и полимеры", "38%"], ["Пищевые отходы", "29%"], ["Бумага и картон", "18%"], ["Стекло", "8%"], ["Прочее", "7%"]] },
              { title: "Источники загрязнения", items: [["Бытовые отходы", "52%"], ["Сельхозотходы", "27%"], ["Строительный мусор", "13%"], ["Промышленные", "8%"]] },
              { title: "Загрязнённые территории", items: [["Лесные массивы", "43%"], ["Берега рек", "31%"], ["Придорожные зоны", "18%"], ["Поля и луга", "8%"]] },
            ].map((block) => (
              <div key={block.title} className="bg-[#2d5a27]/20 border border-[#4a7c59]/20 rounded-2xl p-6">
                <h3 className="font-semibold text-[#a8d5a2] mb-4">{block.title}</h3>
                <div className="space-y-3">
                  {block.items.map(([label, pct]) => (
                    <div key={label}>
                      <div className="flex justify-between text-sm text-[#d0e8cc] mb-1">
                        <span>{label}</span><span className="font-semibold">{pct}</span>
                      </div>
                      <div className="h-1.5 bg-[#1a2e1a] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#2d5a27] to-[#a8d5a2] rounded-full" style={{ width: pct }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ВЛИЯНИЕ */}
      <Section id="impact" className="bg-[#f0ebe0]">
        <div className="max-w-6xl mx-auto w-full">
          <span className="text-[#4a7c59] text-sm font-semibold tracking-widest uppercase mb-3 block">03 / Влияние</span>
          <h2 className="font-cormorant text-4xl md:text-5xl font-bold text-[#1a2e1a] mb-12 leading-tight">
            Последствия для природы<br /><span className="text-[#8b2020]">и жизни людей</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "Droplets", color: "#2563eb", bg: "#dbeafe", title: "Загрязнение воды", text: "Токсичные вещества из свалок попадают в грунтовые воды и реку Чулым, отравляя источники питьевой воды и уничтожая водную фауну." },
              { icon: "Wind", color: "#059669", bg: "#d1fae5", title: "Загрязнение воздуха", text: "Стихийные пожары на свалках выбрасывают в атмосферу диоксины и тяжёлые металлы, ухудшая качество воздуха в радиусе десятков километров." },
              { icon: "Bug", color: "#d97706", bg: "#fef3c7", title: "Гибель животных", text: "Животные погибают от поедания мусора и запутывания в пластике. Сокращаются популяции рыбы в реке Чулым и птиц в лесных массивах." },
              { icon: "Heart", color: "#dc2626", bg: "#fee2e2", title: "Здоровье людей", text: "Рост заболеваний дыхательных путей, аллергий и онкологических заболеваний в районах вблизи несанкционированных свалок." },
              { icon: "TreePine", color: "#16a34a", bg: "#dcfce7", title: "Деградация почв", text: "Пластик и химикаты разрушают плодородие почвы, делая её непригодной для сельского хозяйства на многие десятилетия." },
              { icon: "Users", color: "#7c3aed", bg: "#ede9fe", title: "Качество жизни", text: "Снижение туристической привлекательности района, обесценивание земель вблизи загрязнённых территорий, ухудшение психологического благополучия жителей." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm border border-[#e8e0d0] hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: item.bg }}>
                  <Icon name={item.icon as "Droplets"} size={22} style={{ color: item.color }} />
                </div>
                <h3 className="font-semibold text-[#1a2e1a] mb-2">{item.title}</h3>
                <p className="text-[#5a7a5a] text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ПРИЧИНЫ */}
      <Section id="causes" className="bg-[#f5f0e8]">
        <div className="max-w-5xl mx-auto w-full">
          <span className="text-[#4a7c59] text-sm font-semibold tracking-widest uppercase mb-3 block">04 / Анализ причин</span>
          <h2 className="font-cormorant text-4xl md:text-5xl font-bold text-[#1a2e1a] mb-12 leading-tight">
            Почему это<br /><span className="text-[#2d5a27]">происходит?</span>
          </h2>
          <div className="space-y-4">
            {[
              { num: "01", title: "Недостаточная инфраструктура", text: "В большинстве сёл Чулымского района отсутствуют контейнерные площадки и организованный вывоз мусора. Жители вынуждены самостоятельно избавляться от отходов, часто выбрасывая их в лес или поле.", tag: "Инфраструктура" },
              { num: "02", title: "Низкая экологическая культура", text: "Многие жители не осознают долгосрочных последствий загрязнения. Отсутствие экологического воспитания с детства приводит к безответственному обращению с отходами.", tag: "Культура" },
              { num: "03", title: "Слабый контроль и штрафы", text: "Административные механизмы наказания за несанкционированные свалки практически не работают. Штрафы минимальны, а выявляемость нарушителей крайне низка.", tag: "Законодательство" },
              { num: "04", title: "Отсутствие переработки", text: "В районе нет пунктов раздельного сбора мусора и предприятий по переработке вторсырья. Весь мусор идёт на единственный полигон, который давно переполнен.", tag: "Переработка" },
              { num: "05", title: "Экономические факторы", text: "Высокая стоимость законного вывоза мусора заставляет малоимущее население и предпринимателей искать незаконные способы утилизации отходов.", tag: "Экономика" },
            ].map((item) => (
              <div key={item.num} className="flex gap-6 bg-white rounded-2xl p-6 border border-[#e8e0d0] hover:border-[#2d5a27]/30 transition-all hover:shadow-sm">
                <div className="font-cormorant text-4xl font-bold text-[#2d5a27]/20 leading-none shrink-0 pt-1">{item.num}</div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="font-semibold text-[#1a2e1a] text-lg">{item.title}</h3>
                    <span className="text-xs bg-[#2d5a27]/10 text-[#2d5a27] px-3 py-0.5 rounded-full font-medium">{item.tag}</span>
                  </div>
                  <p className="text-[#5a7a5a] leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* РЕШЕНИЯ */}
      <Section id="solutions" className="bg-[#2d5a27]">
        <div className="max-w-6xl mx-auto w-full">
          <span className="text-[#a8d5a2] text-sm font-semibold tracking-widest uppercase mb-3 block">05 / Способы решения</span>
          <h2 className="font-cormorant text-4xl md:text-5xl font-bold text-[#e8f5e2] mb-12 leading-tight">
            Пути к чистому<br /><span className="text-[#a8d5a2]">Чулымскому району</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: "Recycle", title: "Раздельный сбор мусора", text: "Установка контейнеров для раздельного сбора в каждом населённом пункте. Обучение жителей правилам сортировки отходов.", priority: "Срочно" },
              { icon: "GraduationCap", title: "Экологическое образование", text: "Введение уроков экологии в школах, проведение регулярных субботников, создание детских экологических клубов.", priority: "Важно" },
              { icon: "Building2", title: "Пункты переработки", text: "Строительство регионального центра переработки вторсырья. Организация сбора пластика, металла, стекла и бумаги.", priority: "Срочно" },
              { icon: "Scale", title: "Ужесточение законов", text: "Увеличение штрафов за несанкционированные свалки, введение системы видеонаблюдения в лесах и у дорог.", priority: "Важно" },
              { icon: "Leaf", title: "Посадка деревьев", text: "Компенсационное озеленение загрязнённых территорий. Восстановление лесных полос вдоль рек и дорог района.", priority: "Долгосрочно" },
              { icon: "HandHeart", title: "Волонтёрское движение", text: "Создание районного экологического движения. Ежегодные акции по очистке рек, лесов и дорог Чулымского района.", priority: "Сейчас" },
            ].map((item) => (
              <div key={item.title} className="bg-[#e8f5e2]/10 border border-[#a8d5a2]/20 rounded-2xl p-6 hover:bg-[#e8f5e2]/15 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-[#a8d5a2]/20 rounded-xl flex items-center justify-center">
                    <Icon name={item.icon as "Recycle"} size={20} className="text-[#a8d5a2]" />
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${item.priority === "Срочно" ? "bg-[#ef4444]/20 text-[#fca5a5]" : item.priority === "Сейчас" ? "bg-[#f59e0b]/20 text-[#fcd34d]" : item.priority === "Важно" ? "bg-[#3b82f6]/20 text-[#93c5fd]" : "bg-[#a8d5a2]/20 text-[#a8d5a2]"}`}>{item.priority}</span>
                </div>
                <h3 className="font-semibold text-[#e8f5e2] mb-2">{item.title}</h3>
                <p className="text-[#a8d5a2] text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ПРИМЕРЫ */}
      <Section id="examples" className="bg-[#f0ebe0]">
        <div className="max-w-6xl mx-auto w-full">
          <span className="text-[#4a7c59] text-sm font-semibold tracking-widest uppercase mb-3 block">06 / Успешные примеры</span>
          <h2 className="font-cormorant text-4xl md:text-5xl font-bold text-[#1a2e1a] mb-4 leading-tight">
            Это уже работает<br /><span className="text-[#2d5a27]">в других регионах</span>
          </h2>
          <p className="text-[#5a7a5a] mb-12 max-w-2xl">При правильном подходе можно значительно улучшить экологическую обстановку за 3–5 лет. Опыт соседних регионов России доказывает это.</p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#e8e0d0]">
              <img src={IMG_VOLUNTEERS} alt="Волонтёры" className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 bg-[#2d5a27] rounded-full" />
                  <span className="text-xs text-[#4a7c59] font-semibold uppercase tracking-wider">Томская область</span>
                </div>
                <h3 className="font-cormorant text-2xl font-bold text-[#1a2e1a] mb-3">Проект «Чистые берега Оби»</h3>
                <p className="text-[#5a7a5a] text-sm leading-relaxed mb-4">За 4 года работы волонтёрского движения с берегов реки вывезено более 800 тонн мусора. Участие приняли свыше 12 000 человек. Популяция рыбы выросла на 23%.</p>
                <div className="flex gap-3">
                  <div className="bg-[#dcfce7] rounded-xl px-3 py-2 text-center">
                    <div className="font-cormorant text-2xl font-bold text-[#16a34a]">800т</div>
                    <div className="text-xs text-[#16a34a]">убрано</div>
                  </div>
                  <div className="bg-[#dbeafe] rounded-xl px-3 py-2 text-center">
                    <div className="font-cormorant text-2xl font-bold text-[#2563eb]">12K+</div>
                    <div className="text-xs text-[#2563eb]">участников</div>
                  </div>
                  <div className="bg-[#fef3c7] rounded-xl px-3 py-2 text-center">
                    <div className="font-cormorant text-2xl font-bold text-[#d97706]">+23%</div>
                    <div className="text-xs text-[#d97706]">рыбы в реке</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { region: "Алтайский край", title: "Раздельный сбор в сёлах", text: "В 78 сельских поселениях введён раздельный сбор мусора. Объём захораниваемых отходов сократился на 40% за 2 года.", tag: "Сортировка", result: "-40% отходов" },
                { region: "Кемеровская область", title: "Школьная экопрограмма", text: "Введение экологических уроков во всех школах области. Дети стали «экоагентами» — влияют на поведение родителей.", tag: "Образование", result: "15 000 школ" },
                { region: "Красноярский край", title: "Цифровой мониторинг свалок", text: "Система спутникового мониторинга выявила и ликвидировала 234 несанкционированных свалки за один год.", tag: "Технологии", result: "234 свалки" },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-5 border border-[#e8e0d0] flex gap-4 hover:shadow-sm transition-shadow">
                  <div className="shrink-0 w-1 bg-[#2d5a27] rounded-full" />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs text-[#4a7c59] font-semibold">{item.region}</span>
                      <span className="text-xs bg-[#2d5a27]/10 text-[#2d5a27] px-2 py-0.5 rounded-full">{item.tag}</span>
                    </div>
                    <h3 className="font-semibold text-[#1a2e1a] mb-1">{item.title}</h3>
                    <p className="text-[#5a7a5a] text-sm mb-2 leading-snug">{item.text}</p>
                    <div className="text-[#2d5a27] font-semibold text-sm">✓ {item.result}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ВЫВОД */}
      <Section id="conclusion" className="bg-[#1a2e1a]">
        <div className="max-w-4xl mx-auto w-full text-center">
          <span className="text-[#4a7c59] text-sm font-semibold tracking-widest uppercase mb-3 block">07 / Вывод</span>
          <h2 className="font-cormorant text-5xl md:text-6xl font-bold text-[#e8f5e2] mb-6 leading-tight">
            Время действовать —<br /><span className="text-[#a8d5a2] italic">это наш район</span>
          </h2>
          <p className="text-[#7aad7a] text-lg leading-relaxed mb-8 max-w-3xl mx-auto">
            Экологические проблемы Чулымского района — не абстрактная угроза, а реальность, влияющая на здоровье и качество жизни каждого жителя. Решение есть, и оно начинается с каждого из нас.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-12 text-left">
            {[
              { icon: "CheckCircle", title: "Осознанность", text: "Каждый житель должен понимать последствия своих действий для природы родного края." },
              { icon: "Users", title: "Совместные усилия", text: "Только объединив усилия школ, администрации и жителей, можно изменить ситуацию к лучшему." },
              { icon: "TrendingUp", title: "Системный подход", text: "Необходимы долгосрочные программы, а не разовые акции — только тогда изменения будут устойчивыми." },
            ].map((item) => (
              <div key={item.title} className="bg-[#2d5a27]/30 border border-[#4a7c59]/30 rounded-2xl p-5">
                <Icon name={item.icon as "CheckCircle"} size={24} className="text-[#a8d5a2] mb-3" />
                <h3 className="font-semibold text-[#e8f5e2] mb-2">{item.title}</h3>
                <p className="text-[#7aad7a] text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-[#2d5a27] to-[#3d7a37] rounded-3xl p-8 md:p-12 mb-8">
            <div className="text-5xl mb-4">🌱</div>
            <h3 className="font-cormorant text-3xl md:text-4xl font-bold text-[#e8f5e2] mb-4">Призыв к действию</h3>
            <p className="text-[#d0e8cc] text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
              Начни сегодня: не бросай мусор, раздели отходы дома, расскажи друзьям и семье, участвуй в субботниках. Маленькие действия каждого человека складываются в большие изменения для всего Чулымского района.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {["🚯 Не мусори", "♻️ Сортируй отходы", "🌳 Сади деревья", "📢 Распространяй знания"].map((action) => (
                <span key={action} className="bg-[#e8f5e2]/15 border border-[#e8f5e2]/20 text-[#e8f5e2] px-5 py-2.5 rounded-full font-medium">
                  {action}
                </span>
              ))}
            </div>
          </div>

          <div className="text-[#4a7c59] text-sm">
            <p className="font-cormorant text-lg text-[#7aad7a] italic mb-1">Индивидуальный проект</p>
            <p>Мусор и экология в Новосибирской области Чулымского района · 2026</p>
          </div>
        </div>
      </Section>

      {/* Кнопка наверх */}
      <button
        onClick={() => scrollTo("hero")}
        className="fixed bottom-6 right-6 w-12 h-12 bg-[#2d5a27] hover:bg-[#3d7a37] text-[#e8f5e2] rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-40"
      >
        <Icon name="ArrowUp" size={18} />
      </button>
    </div>
  );
}
