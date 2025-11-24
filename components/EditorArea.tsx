import React from 'react';

interface EditorAreaProps {
  code: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
  label: string;
}

export const EditorArea: React.FC<EditorAreaProps> = ({ code, onChange, disabled, readOnly, label }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!readOnly) {
      onChange(e.target.value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (readOnly) return;
    
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const value = target.value;
      
      // Python uses 4 spaces for indentation usually
      const newValue = value.substring(0, start) + '    ' + value.substring(end);
      
      onChange(newValue);
      
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 4;
      }, 0);
    }
  };

  return (
    <div className={`relative w-full h-full font-mono text-sm overflow-hidden flex flex-col ${readOnly ? 'bg-[#0d1117]' : 'bg-[#0d1117]'}`}>
      {/* Header Label */}
      <div className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border-b border-gray-800 flex justify-between items-center select-none ${readOnly ? 'bg-[#161b22] text-blue-400' : 'bg-[#161b22] text-green-400'}`}>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${readOnly ? 'bg-blue-500' : 'bg-green-500 animate-pulse'}`}></div>
          <span>{label}</span>
        </div>
        {readOnly && <span className="text-gray-600 text-[10px]">READ ONLY</span>}
        {!readOnly && <span className="text-gray-600 text-[10px]">EDITABLE</span>}
      </div>

      <div className="flex-1 relative group">
        <textarea
          value={code}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          readOnly={readOnly}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          className={`absolute inset-0 w-full h-full p-4 bg-transparent resize-none outline-none border-none leading-relaxed font-mono z-10 
            ${readOnly ? 'text-gray-400 cursor-default' : 'text-gray-100 placeholder-gray-700'}
            selection:bg-blue-500/30`}
          style={{ tabSize: 4, whiteSpace: 'pre' }}
          placeholder={!readOnly ? "# 여기에 코드를 입력하세요..." : ""}
        />
      </div>
    </div>
  );
};