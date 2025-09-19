import { useState } from 'react';
import { Checkbox } from './components/ui/checkbox';
import { Card } from './components/ui/card';
import { Progress } from './components/ui/progress';
import { CheckCircle2 } from 'lucide-react';
import checklistImage from 'figma:asset/6706860a65e19a083a24260aee06c16eaf99de55.png';

export default function App() {
  // Essential items
  const [essentialItems, setEssentialItems] = useState([
    { id: 'hookah', label: 'КАЛЬЯН', checked: false },
    { id: 'hose', label: 'ШЛАНГ И МУНДШТУК', checked: false },
    { id: 'flask', label: 'КОЛБА', checked: false },
    { id: 'bowl', label: 'ЧАША', checked: false },
    { id: 'kaloud', label: 'КАЛАУД', checked: false },
    { id: 'molasses', label: 'МЕЛАССООЛОВИТЕЛЬ', checked: false },
    { id: 'tobacco', label: 'ТАБАЧНАЯ СМЕСЬ', checked: false },
    { id: 'coal', label: 'УГОЛЬ', checked: false },
    { id: 'awl', label: 'ШИЛО, ВИЛКА ИЛИ ШИЛО-ВИЛКА', checked: false },
    { id: 'stove', label: 'ПЛИТКА ИЛИ ГОРЕЛКА', checked: false },
    { id: 'tongs', label: 'ЩИПЦЫ', checked: false },
    { id: 'container', label: 'ЕМКОСТЬ ДЛЯ УГЛЯ', checked: false },
    { id: 'seal', label: 'УПЛОТНИТЕЛЬ ДЛЯ ЧАШИ', checked: false },
    { id: 'water', label: 'БУТЫЛЬ ВОДЫ', checked: false },
  ]);

  // Optional items
  const [optionalItems, setOptionalItems] = useState([
    { id: 'lighter', label: 'ЗАЖИГАЛКА', checked: false },
    { id: 'towels', label: 'БУМАЖНЫЕ ПОЛОТЕНЦА И ВЛАЖНЫЕ САЛФЕТКИ', checked: false },
    { id: 'mat', label: 'СИЛИКОНОВЫЙ ЗАЩИТНЫЙ КОВРИК', checked: false },
    { id: 'screen', label: 'ЗАЩИТНАЯ СЕТКА ИЛИ ВЕТРОВИК', checked: false },
  ]);

  const toggleEssentialItem = (id: string) => {
    setEssentialItems(items =>
      items.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const toggleOptionalItem = (id: string) => {
    setOptionalItems(items =>
      items.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const essentialChecked = essentialItems.filter(item => item.checked).length;
  const optionalChecked = optionalItems.filter(item => item.checked).length;
  const totalChecked = essentialChecked + optionalChecked;
  const totalItems = essentialItems.length + optionalItems.length;

  const essentialProgress = (essentialChecked / essentialItems.length) * 100;
  const overallProgress = (totalChecked / totalItems) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <img 
              src={checklistImage} 
              alt="Кальянные принадлежности с галочками" 
              className="mx-auto w-80 h-80 object-contain"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            ЧТО ДОЛЖНО БЫТЬ
            <br />
            В КАЛЬЯННОЙ СУМКЕ
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Это чек-лист с содержимым кальянной сумки,
            <br />
            чтобы ты мог легко свериться в любой момент и точно
            <br />
            ничего не забыть. <span className="text-white font-medium">Сохрани его, чтобы не потерять</span>
          </p>
        </div>

        {/* Progress Overview */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
            <CheckCircle2 className="w-6 h-6 text-green-400" />
            <span className="text-lg">
              Готовность: {totalChecked} из {totalItems} элементов
            </span>
          </div>
          <div className="mt-4 max-w-md mx-auto">
            <Progress value={overallProgress} className="h-3" />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Essential Items */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-2xl font-bold text-white">ОБЯЗАТЕЛЬНО</h2>
                <div className="text-right">
                  <div className="text-sm text-gray-300">
                    {essentialChecked} из {essentialItems.length}
                  </div>
                  <div className="text-lg font-medium text-green-400">
                    {Math.round(essentialProgress)}%
                  </div>
                </div>
              </div>
              <Progress value={essentialProgress} className="h-2" />
            </div>

            <div className="space-y-4">
              {essentialItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <Checkbox
                    id={`essential-${item.id}`}
                    checked={item.checked}
                    onCheckedChange={(checked) => {
                      setEssentialItems(items =>
                        items.map(essentialItem =>
                          essentialItem.id === item.id ? { ...essentialItem, checked: !!checked } : essentialItem
                        )
                      );
                    }}
                    className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor={`essential-${item.id}`}
                    className={`flex-1 cursor-pointer transition-all ${
                      item.checked
                        ? 'text-green-400 line-through opacity-75'
                        : 'text-white hover:text-gray-200'
                    }`}
                  >
                    {item.label}
                  </label>
                </div>
              ))}
            </div>
          </Card>

          {/* Optional Items */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-2xl font-bold text-white">ЛУЧШЕ ВЗЯТЬ</h2>
                <div className="text-right">
                  <div className="text-sm text-gray-300">
                    {optionalChecked} из {optionalItems.length}
                  </div>
                  <div className="text-lg font-medium text-blue-400">
                    {Math.round((optionalChecked / optionalItems.length) * 100)}%
                  </div>
                </div>
              </div>
              <Progress 
                value={(optionalChecked / optionalItems.length) * 100} 
                className="h-2"
              />
            </div>

            <div className="space-y-4">
              {optionalItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <Checkbox
                    id={`optional-${item.id}`}
                    checked={item.checked}
                    onCheckedChange={(checked) => {
                      setOptionalItems(items =>
                        items.map(optionalItem =>
                          optionalItem.id === item.id ? { ...optionalItem, checked: !!checked } : optionalItem
                        )
                      );
                    }}
                    className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                  />
                  <label
                    htmlFor={`optional-${item.id}`}
                    className={`flex-1 cursor-pointer transition-all ${
                      item.checked
                        ? 'text-blue-400 line-through opacity-75'
                        : 'text-white hover:text-gray-200'
                    }`}
                  >
                    {item.label}
                  </label>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Academy Brand (Optional) */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-gray-400 text-sm">
            <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">
              <span className="font-bold text-xs">A</span>
            </div>
            <span>ACADEMY BY DARKSIDE</span>
          </div>
        </div>

        {/* Success Message */}
        {essentialChecked === essentialItems.length && (
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-3 bg-green-500/20 border border-green-500/30 rounded-lg px-6 py-4">
              <CheckCircle2 className="w-8 h-8 text-green-400" />
              <div>
                <div className="font-bold text-green-400">Все обязательные элементы собраны!</div>
                <div className="text-sm text-green-300">Теперь можно спокойно наслаждаться кальяном</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}