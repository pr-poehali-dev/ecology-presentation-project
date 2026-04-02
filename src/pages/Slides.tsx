import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const IMG_POLLUTION = "https://cdn.poehali.dev/projects/3e92cb31-4d9c-4ae1-b25f-49a26e009221/files/82140463-6ed9-4038-ad50-5a56dd34eab5.jpg";
const IMG_NATURE = "https://cdn.poehali.dev/projects/3e92cb31-4d9c-4ae1-b25f-49a26e009221/files/e7f3a6c1-1536-4b8f-8b46-517e69cb5ce3.jpg";
const IMG_VOLUNTEERS = "https://cdn.poehali.dev/projects/3e92cb31-4d9c-4ae1-b25f-49a26e009221/files/50c887bd-a070-4062-889c-dfaeefb244b7.jpg";

const slides = [
  // Слайд 1 — Титульный
  {
    id: 1,
    content: (
      <div className="relative w-full h-full flex flex-col items-center justify-center text-center overflow-hidden bg-[#1a2e1a]">
        <img src={IMG_NATURE} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a2e1a]/60 to-[#1a2e1a]/90" />
        <div className="relative z-10 px-12">
          <div className="inline-block border border-[#a8d5a2]/40 rounded-full px-5 py-1.5 mb-6">
            <span className="text-[#a8d5a2] text-sm tracking-widest uppercase font-medium">Индивидуальный проект · 2026</span>
          </div>
          <h1 className="font-cormorant text-5xl font-bold text-white leading-tight mb-4">
            Мусор и экология<br />в Новосибирской области
          </h1>
          <p className="font-cormorant text-3xl text-[#a8d5a2] italic mb-8">Чулымский район</p>
          <div className="w-24 h-0.5 bg-[#a8d5a2]/50 mx-auto mb-8" />
          <p className="text-[#d0e8cc] text-base">Выполнил: ученик ___ класса</p>
          <p className="text-[#7aad7a] text-sm mt-1">Руководитель: ____________________</p>
        </div>
        <div className="absolute bottom-6 left-8 text-[#4a7c59] text-xs">Слайд 1 / 12</div>
      </div>
    ),
  },
  // Слайд 2 — Содержание
  {
    id: 2,
    content: (
      <div className="w-full h-full bg-[#f5f0e8] flex flex-col px-14 py-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-8 bg-[#2d5a27] rounded-full" />
          <h2 className="font-cormorant text-3xl font-bold text-[#1a2e1a]">Содержание презентации</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 flex-1">
          {[
            ["01", "Описание проблемы"],
            ["02", "Статистика и данные"],
            ["03", "Влияние на природу"],
            ["04", "Влияние на людей"],
            ["05", "Анализ причин"],
            ["06", "Пути решения"],
            ["07", "Успешные примеры"],
            ["08", "Выводы и призыв"],
          ].map(([num, title]) => (
            <div key={num} className="flex items-center gap-4 bg-white rounded-xl px-5 py-3 border border-[#e8e0d0]">
              <span className="font-cormorant text-2xl font-bold text-[#2d5a27]/30">{num}</span>
              <span className="font-medium text-[#1a2e1a]">{title}</span>
            </div>
          ))}
        </div>
        <div className="text-right text-[#9ab89a] text-xs mt-3">Слайд 2 / 12</div>
      </div>
    ),
  },
  // Слайд 3 — Проблема
  {
    id: 3,
    content: (
      <div className="w-full h-full bg-white grid grid-cols-2">
        <div className="flex flex-col justify-center px-12 py-10">
          <span className="text-[#4a7c59] text-xs font-semibold tracking-widest uppercase mb-3">01 / Проблема</span>
          <h2 className="font-cormorant text-4xl font-bold text-[#1a2e1a] leading-tight mb-5">
            Экологический<br />кризис в районе
          </h2>
          <ul className="space-y-3">
            {[
              "Несанкционированные свалки в лесах и у рек",
              "Загрязнение реки Чулым и её притоков",
              "Переполненный полигон ТКО",
              "Отсутствие инфраструктуры переработки",
              "Снижение биоразнообразия экосистем",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-[#3a5a3a] text-sm">
                <span className="mt-1 w-2 h-2 rounded-full bg-[#2d5a27] shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative overflow-hidden">
          <img src={IMG_POLLUTION} alt="Загрязнение" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent" />
          <div className="absolute bottom-6 right-6 bg-[#8b2020]/90 text-white rounded-xl px-4 py-3 text-center">
            <div className="text-2xl font-bold">⚠️</div>
            <div className="text-xs mt-1">Угроза экосистеме</div>
          </div>
        </div>
        <div className="col-span-2 text-right px-6 pb-2 text-[#9ab89a] text-xs">Слайд 3 / 12</div>
      </div>
    ),
  },
  // Слайд 4 — Статистика цифры
  {
    id: 4,
    content: (
      <div className="w-full h-full bg-[#1a2e1a] flex flex-col px-12 py-10">
        <span className="text-[#4a7c59] text-xs font-semibold tracking-widest uppercase mb-3">02 / Статистика</span>
        <h2 className="font-cormorant text-4xl font-bold text-[#e8f5e2] mb-8">Цифры говорят сами за себя</h2>
        <div className="grid grid-cols-4 gap-4 flex-1">
          {[
            { val: "47+", label: "несанкционированных\nсвалок в районе", icon: "MapPin" },
            { val: "3 200 т", label: "отходов образуется\nежегодно", icon: "Trash2" },
            { val: "78%", label: "отходов не\nперерабатывается", icon: "AlertTriangle" },
            { val: "12 рек", label: "водных объектов\nзагрязнены", icon: "Waves" },
          ].map((item) => (
            <div key={item.val} className="bg-[#2d5a27]/30 border border-[#4a7c59]/30 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
              <Icon name={item.icon as "MapPin"} size={24} className="text-[#a8d5a2] mb-3" />
              <div className="font-cormorant text-4xl font-bold text-white mb-2">{item.val}</div>
              <div className="text-[#7aad7a] text-xs leading-snug whitespace-pre-line">{item.label}</div>
            </div>
          ))}
        </div>
        <div className="text-right text-[#4a7c59] text-xs mt-3">Слайд 4 / 12</div>
      </div>
    ),
  },
  // Слайд 5 — Состав отходов
  {
    id: 5,
    content: (
      <div className="w-full h-full bg-[#1a2e1a] flex flex-col px-12 py-10">
        <span className="text-[#4a7c59] text-xs font-semibold tracking-widest uppercase mb-3">02 / Статистика</span>
        <h2 className="font-cormorant text-4xl font-bold text-[#e8f5e2] mb-8">Состав и источники отходов</h2>
        <div className="grid grid-cols-2 gap-6 flex-1">
          <div>
            <h3 className="text-[#a8d5a2] font-semibold mb-4">Морфологический состав ТКО</h3>
            <div className="space-y-3">
              {[["Пластик и полимеры", "38%", "#ef4444"], ["Пищевые отходы", "29%", "#f59e0b"], ["Бумага и картон", "18%", "#3b82f6"], ["Стекло", "8%", "#10b981"], ["Прочее", "7%", "#8b5cf6"]].map(([l, p, c]) => (
                <div key={l}>
                  <div className="flex justify-between text-sm text-[#d0e8cc] mb-1"><span>{l}</span><span className="font-bold">{p}</span></div>
                  <div className="h-2 bg-[#0d1a0d] rounded-full"><div className="h-full rounded-full" style={{ width: p, backgroundColor: c }} /></div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-[#a8d5a2] font-semibold mb-4">Источники загрязнения</h3>
            <div className="space-y-3">
              {[["Бытовые отходы", "52%", "#2d5a27"], ["Сельхозотходы", "27%", "#4a7c59"], ["Строительный мусор", "13%", "#7aad7a"], ["Промышленные", "8%", "#a8d5a2"]].map(([l, p, c]) => (
                <div key={l}>
                  <div className="flex justify-between text-sm text-[#d0e8cc] mb-1"><span>{l}</span><span className="font-bold">{p}</span></div>
                  <div className="h-2 bg-[#0d1a0d] rounded-full"><div className="h-full rounded-full" style={{ width: p, backgroundColor: c }} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="text-right text-[#4a7c59] text-xs mt-3">Слайд 5 / 12</div>
      </div>
    ),
  },
  // Слайд 6 — Влияние на природу
  {
    id: 6,
    content: (
      <div className="w-full h-full bg-[#f0ebe0] flex flex-col px-12 py-10">
        <span className="text-[#4a7c59] text-xs font-semibold tracking-widest uppercase mb-3">03 / Влияние на природу</span>
        <h2 className="font-cormorant text-4xl font-bold text-[#1a2e1a] mb-7">Последствия для экосистем</h2>
        <div className="grid grid-cols-3 gap-4 flex-1">
          {[
            { icon: "Droplets", color: "#2563eb", bg: "#dbeafe", title: "Загрязнение воды", text: "Токсины из свалок попадают в грунтовые воды и реку Чулым, уничтожая водную фауну" },
            { icon: "TreePine", color: "#16a34a", bg: "#dcfce7", title: "Деградация почв", text: "Пластик и химикаты делают почву непригодной для сельского хозяйства на десятилетия" },
            { icon: "Bug", color: "#d97706", bg: "#fef3c7", title: "Гибель животных", text: "Сокращение популяций рыбы в Чулыме, гибель птиц и млекопитающих от мусора" },
            { icon: "Wind", color: "#059669", bg: "#d1fae5", title: "Загрязнение воздуха", text: "Сжигание мусора выбрасывает диоксины и тяжёлые металлы в атмосферу" },
            { icon: "Flame", color: "#dc2626", bg: "#fee2e2", title: "Лесные пожары", text: "Мусор в лесах создаёт условия для возникновения пожаров летом" },
            { icon: "Fish", color: "#0891b2", bg: "#cffafe", title: "Рыбные запасы", text: "Загрязнение Чулыма привело к сокращению уловов рыбы у местных жителей" },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-xl p-4 border border-[#e8e0d0]">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: item.bg }}>
                <Icon name={item.icon as "Droplets"} size={18} style={{ color: item.color }} />
              </div>
              <h3 className="font-semibold text-[#1a2e1a] text-sm mb-1">{item.title}</h3>
              <p className="text-[#5a7a5a] text-xs leading-snug">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="text-right text-[#9ab89a] text-xs mt-3">Слайд 6 / 12</div>
      </div>
    ),
  },
  // Слайд 7 — Влияние на людей
  {
    id: 7,
    content: (
      <div className="w-full h-full bg-white grid grid-cols-2">
        <div className="flex flex-col justify-center px-12 py-10">
          <span className="text-[#4a7c59] text-xs font-semibold tracking-widest uppercase mb-3">04 / Влияние на людей</span>
          <h2 className="font-cormorant text-4xl font-bold text-[#1a2e1a] leading-tight mb-6">
            Последствия для<br />жизни людей
          </h2>
          <div className="space-y-4">
            {[
              { icon: "Heart", color: "#dc2626", title: "Здоровье", text: "Рост заболеваний органов дыхания, аллергий, онкологии вблизи свалок" },
              { icon: "Droplets", color: "#2563eb", title: "Питьевая вода", text: "Загрязнение колодцев и скважин токсичными веществами" },
              { icon: "TrendingDown", color: "#d97706", title: "Экономика", text: "Снижение стоимости земли, потеря туристического потенциала" },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: item.color + "20" }}>
                  <Icon name={item.icon as "Heart"} size={18} style={{ color: item.color }} />
                </div>
                <div>
                  <div className="font-semibold text-[#1a2e1a] text-sm">{item.title}</div>
                  <div className="text-[#5a7a5a] text-xs mt-0.5">{item.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[#8b2020] flex flex-col items-center justify-center px-10 text-center">
          <div className="text-6xl mb-4">🏥</div>
          <div className="font-cormorant text-5xl font-bold text-white mb-2">↑ 34%</div>
          <div className="text-[#f5c6c6] text-sm mb-6">рост респираторных<br />заболеваний в районе</div>
          <div className="font-cormorant text-3xl font-bold text-white mb-2">↓ 40%</div>
          <div className="text-[#f5c6c6] text-sm">стоимость земли<br />у загрязнённых зон</div>
        </div>
        <div className="col-span-2 text-right px-6 pb-2 text-[#9ab89a] text-xs">Слайд 7 / 12</div>
      </div>
    ),
  },
  // Слайд 8 — Причины
  {
    id: 8,
    content: (
      <div className="w-full h-full bg-[#f5f0e8] flex flex-col px-12 py-10">
        <span className="text-[#4a7c59] text-xs font-semibold tracking-widest uppercase mb-3">05 / Причины</span>
        <h2 className="font-cormorant text-4xl font-bold text-[#1a2e1a] mb-7">Почему это происходит?</h2>
        <div className="space-y-3 flex-1">
          {[
            { num: "01", title: "Нет инфраструктуры", text: "Отсутствие контейнеров, вывоза мусора, полигонов и пунктов переработки в сёлах", color: "#ef4444" },
            { num: "02", title: "Низкая экокультура", text: "Население не осознаёт последствий; экологическое воспитание в школах не ведётся", color: "#f59e0b" },
            { num: "03", title: "Слабый контроль", text: "Минимальные штрафы, отсутствие видеонаблюдения, низкая выявляемость нарушителей", color: "#3b82f6" },
            { num: "04", title: "Нет переработки", text: "Некуда сдать раздельно собранный мусор — нет предприятий по работе с вторсырьём", color: "#8b5cf6" },
            { num: "05", title: "Экономика", text: "Высокая стоимость легальной утилизации вынуждает людей выбрасывать мусор в лесу", color: "#10b981" },
          ].map((item) => (
            <div key={item.num} className="flex gap-5 bg-white rounded-xl px-5 py-3 border border-[#e8e0d0]">
              <span className="font-cormorant text-3xl font-bold shrink-0 w-10" style={{ color: item.color + "60" }}>{item.num}</span>
              <div>
                <span className="font-semibold text-[#1a2e1a] text-sm">{item.title} — </span>
                <span className="text-[#5a7a5a] text-sm">{item.text}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-right text-[#9ab89a] text-xs mt-3">Слайд 8 / 12</div>
      </div>
    ),
  },
  // Слайд 9 — Решения
  {
    id: 9,
    content: (
      <div className="w-full h-full bg-[#2d5a27] flex flex-col px-12 py-10">
        <span className="text-[#a8d5a2] text-xs font-semibold tracking-widest uppercase mb-3">06 / Решения</span>
        <h2 className="font-cormorant text-4xl font-bold text-[#e8f5e2] mb-7">Пути к чистому Чулыму</h2>
        <div className="grid grid-cols-3 gap-4 flex-1">
          {[
            { icon: "Recycle", title: "Раздельный сбор", text: "Контейнеры в каждом селе + обучение сортировке", tag: "Срочно", tagColor: "#fca5a5" },
            { icon: "Building2", title: "Центр переработки", text: "Региональный центр для пластика, металла, стекла", tag: "Срочно", tagColor: "#fca5a5" },
            { icon: "GraduationCap", title: "Экообразование", text: "Уроки экологии, клубы, субботники в школах", tag: "Важно", tagColor: "#93c5fd" },
            { icon: "Scale", title: "Закон и контроль", text: "Увеличение штрафов, видеонаблюдение в лесах", tag: "Важно", tagColor: "#93c5fd" },
            { icon: "HandHeart", title: "Волонтёры", text: "Районное эко-движение, ежегодные акции очистки", tag: "Сейчас", tagColor: "#fcd34d" },
            { icon: "Leaf", title: "Озеленение", text: "Восстановление лесов и прибрежных зон рек", tag: "Долгосрочно", tagColor: "#a8d5a2" },
          ].map((item) => (
            <div key={item.title} className="bg-[#e8f5e2]/10 border border-[#a8d5a2]/20 rounded-xl p-4">
              <div className="flex items-start justify-between mb-3">
                <Icon name={item.icon as "Recycle"} size={20} className="text-[#a8d5a2]" />
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: item.tagColor + "25", color: item.tagColor }}>{item.tag}</span>
              </div>
              <h3 className="font-semibold text-[#e8f5e2] text-sm mb-1">{item.title}</h3>
              <p className="text-[#a8d5a2] text-xs leading-snug">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="text-right text-[#4a7c59] text-xs mt-3">Слайд 9 / 12</div>
      </div>
    ),
  },
  // Слайд 10 — Примеры
  {
    id: 10,
    content: (
      <div className="w-full h-full bg-[#f0ebe0] flex flex-col px-12 py-10">
        <span className="text-[#4a7c59] text-xs font-semibold tracking-widest uppercase mb-3">07 / Примеры</span>
        <h2 className="font-cormorant text-4xl font-bold text-[#1a2e1a] mb-7">Это уже работает!</h2>
        <div className="grid grid-cols-2 gap-4 flex-1">
          <div className="bg-white rounded-2xl overflow-hidden border border-[#e8e0d0]">
            <img src={IMG_VOLUNTEERS} alt="Волонтёры" className="w-full h-32 object-cover" />
            <div className="p-4">
              <div className="text-xs text-[#4a7c59] font-semibold mb-1">Томская область</div>
              <h3 className="font-cormorant text-lg font-bold text-[#1a2e1a] mb-2">«Чистые берега Оби»</h3>
              <div className="flex gap-2">
                <div className="bg-[#dcfce7] rounded-lg px-2 py-1 text-center"><div className="font-bold text-[#16a34a] text-sm">800 т</div><div className="text-[#16a34a] text-[10px]">мусора</div></div>
                <div className="bg-[#dbeafe] rounded-lg px-2 py-1 text-center"><div className="font-bold text-[#2563eb] text-sm">12K+</div><div className="text-[#2563eb] text-[10px]">волонтёров</div></div>
                <div className="bg-[#fef3c7] rounded-lg px-2 py-1 text-center"><div className="font-bold text-[#d97706] text-sm">+23%</div><div className="text-[#d97706] text-[10px]">рыбы</div></div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { region: "Алтайский край", title: "Раздельный сбор в сёлах", result: "-40% отходов на полигоне", color: "#2d5a27" },
              { region: "Кемеровская обл.", title: "Школьная экопрограмма", result: "15 000 школьников-экоагентов", color: "#3b82f6" },
              { region: "Красноярский край", title: "Цифровой мониторинг", result: "234 свалки ликвидированы за год", color: "#8b5cf6" },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-4 border border-[#e8e0d0] flex gap-3">
                <div className="w-1 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <div>
                  <div className="text-xs font-semibold mb-0.5" style={{ color: item.color }}>{item.region}</div>
                  <div className="font-semibold text-[#1a2e1a] text-sm">{item.title}</div>
                  <div className="text-[#2d5a27] text-xs mt-0.5">✓ {item.result}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-right text-[#9ab89a] text-xs mt-3">Слайд 10 / 12</div>
      </div>
    ),
  },
  // Слайд 11 — Выводы
  {
    id: 11,
    content: (
      <div className="w-full h-full bg-[#1a2e1a] flex flex-col px-12 py-10">
        <span className="text-[#4a7c59] text-xs font-semibold tracking-widest uppercase mb-3">08 / Выводы</span>
        <h2 className="font-cormorant text-4xl font-bold text-[#e8f5e2] mb-8">Основные выводы</h2>
        <div className="space-y-4 flex-1">
          {[
            "В Чулымском районе выявлено 47+ несанкционированных свалок, ежегодно образуется 3 200 т отходов, 78% не перерабатывается",
            "Загрязнение разрушает экосистемы реки Чулым, угрожает здоровью жителей и снижает качество жизни в районе",
            "Главные причины: отсутствие инфраструктуры, низкая экокультура, неэффективный контроль, нет системы переработки",
            "Опыт Томской, Кемеровской областей, Алтайского и Красноярского краёв доказывает: ситуацию можно исправить за 3–5 лет",
            "Решение требует совместных усилий власти, школ, бизнеса и каждого жителя Чулымского района",
          ].map((text, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="w-7 h-7 rounded-full bg-[#2d5a27] flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[#a8d5a2] text-xs font-bold">{i + 1}</span>
              </div>
              <p className="text-[#d0e8cc] text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
        <div className="text-right text-[#4a7c59] text-xs mt-3">Слайд 11 / 12</div>
      </div>
    ),
  },
  // Слайд 12 — Призыв
  {
    id: 12,
    content: (
      <div className="relative w-full h-full flex flex-col items-center justify-center text-center overflow-hidden bg-[#2d5a27]">
        <div className="absolute top-8 left-8 text-5xl opacity-20">🍃</div>
        <div className="absolute bottom-12 right-8 text-4xl opacity-15">🌿</div>
        <div className="relative z-10 px-12 max-w-2xl mx-auto">
          <div className="text-5xl mb-5">🌱</div>
          <h2 className="font-cormorant text-5xl font-bold text-[#e8f5e2] leading-tight mb-4">
            Время действовать —<br /><span className="text-[#a8d5a2] italic">это наш район!</span>
          </h2>
          <p className="text-[#d0e8cc] text-base mb-8 leading-relaxed">
            Каждый из нас может изменить ситуацию. Начни сегодня — и вместе мы сохраним природу Чулымского района для будущих поколений.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {["🚯 Не бросай мусор", "♻️ Сортируй отходы", "🌳 Сади деревья", "📢 Рассказывай другим"].map((a) => (
              <div key={a} className="bg-[#e8f5e2]/15 border border-[#e8f5e2]/20 text-[#e8f5e2] px-4 py-2.5 rounded-full text-sm font-medium">
                {a}
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-4 right-6 text-[#4a7c59] text-xs">Слайд 12 / 12</div>
      </div>
    ),
  },
];

export default function Slides() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(slides.length - 1, c + 1));

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
    if (e.key === "Escape") setIsFullscreen(false);
  };

  return (
    <div className="font-golos bg-[#1a1a1a] min-h-screen flex flex-col" onKeyDown={handleKey} tabIndex={0} style={{ outline: "none" }}>
      {/* Топ-панель */}
      {!isFullscreen && (
        <div className="flex items-center justify-between px-6 py-3 bg-[#111] border-b border-white/10">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 text-[#7aad7a] hover:text-[#a8d5a2] transition-colors text-sm">
            <Icon name="ArrowLeft" size={15} />
            Назад к проекту
          </button>
          <div className="flex items-center gap-2">
            <span className="text-white/40 text-sm">Слайд {current + 1} из {slides.length}</span>
            <button onClick={() => navigate("/referat")} className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white px-3 py-1.5 rounded-full text-xs transition-all">
              <Icon name="FileText" size={13} />
              Реферат
            </button>
            <button onClick={() => { setIsFullscreen(true); }} className="flex items-center gap-2 bg-[#2d5a27] hover:bg-[#3d7a37] text-[#e8f5e2] px-3 py-1.5 rounded-full text-xs transition-all">
              <Icon name="Maximize2" size={13} />
              Полный экран
            </button>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white px-3 py-1.5 rounded-full text-xs transition-all">
              <Icon name="Printer" size={13} />
              Печать
            </button>
          </div>
        </div>
      )}

      {/* Слайд */}
      <div className={`flex-1 flex flex-col items-center justify-center ${isFullscreen ? "fixed inset-0 z-50 bg-black" : "py-6 px-6"}`}>
        {isFullscreen && (
          <button onClick={() => setIsFullscreen(false)} className="absolute top-4 right-4 z-60 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all">
            <Icon name="X" size={18} />
          </button>
        )}

        <div
          className="w-full bg-white shadow-2xl overflow-hidden"
          style={{
            aspectRatio: "16/9",
            maxWidth: isFullscreen ? "100vw" : "min(900px, 100%)",
            maxHeight: isFullscreen ? "100vh" : undefined,
            borderRadius: isFullscreen ? 0 : "12px",
          }}
        >
          {slides[current].content}
        </div>

        {/* Навигация */}
        <div className={`flex items-center gap-4 mt-5 ${isFullscreen ? "absolute bottom-6" : ""}`}>
          <button
            onClick={prev}
            disabled={current === 0}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all"
          >
            <Icon name="ChevronLeft" size={18} />
          </button>

          <div className="flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all ${i === current ? "w-6 h-2 bg-[#a8d5a2]" : "w-2 h-2 bg-white/25 hover:bg-white/40"}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            disabled={current === slides.length - 1}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all"
          >
            <Icon name="ChevronRight" size={18} />
          </button>
        </div>
      </div>

      {/* Миниатюры */}
      {!isFullscreen && (
        <div className="border-t border-white/10 px-6 py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`flex-shrink-0 w-16 h-10 rounded-lg border-2 transition-all text-xs font-bold ${i === current ? "border-[#a8d5a2] bg-[#2d5a27]/40 text-[#a8d5a2]" : "border-white/10 bg-white/5 text-white/40 hover:border-white/25"}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      <style>{`
        @media print {
          body * { visibility: hidden; }
          .slide-print, .slide-print * { visibility: visible; }
        }
      `}</style>
    </div>
  );
}
