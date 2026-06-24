import React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { ArrowUp, Square, StopCircle, Mic } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(" ");

const injectedStyles = `
  *:focus-visible {
    outline-offset: 0 !important;
    --ring-offset: 0 !important;
  }
  textarea::-webkit-scrollbar {
    width: 6px;
  }
  textarea::-webkit-scrollbar-track {
    background: transparent;
  }
  textarea::-webkit-scrollbar-thumb {
    background-color: #444444;
    border-radius: 3px;
  }
  textarea::-webkit-scrollbar-thumb:hover {
    background-color: #555555;
  }
`;

let stylesInjected = false;
function injectStyles() {
  if (stylesInjected) return;
  const styleSheet = document.createElement("style");
  styleSheet.innerText = injectedStyles;
  document.head.appendChild(styleSheet);
  stylesInjected = true;
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => (
  <textarea
    className={cn(
      "flex w-full rounded-md border-none bg-transparent px-3 py-2.5 text-base text-gray-100 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px] resize-none scrollbar-thin scrollbar-thumb-[#444444] scrollbar-track-transparent hover:scrollbar-thumb-[#555555]",
      className
    )}
    ref={ref}
    rows={1}
    {...props}
  />
));
Textarea.displayName = "Textarea";

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border border-[#333333] bg-[#1F2023] px-3 py-1.5 text-sm text-white shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

interface VoiceRecorderProps {
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: (duration: number) => void;
  visualizerBars?: number;
}
const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  isRecording,
  onStartRecording,
  onStopRecording,
  visualizerBars = 32,
}) => {
  const [time, setTime] = React.useState(0);
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  React.useEffect(() => {
    if (isRecording) {
      onStartRecording();
      timerRef.current = setInterval(() => setTime((t) => t + 1), 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      onStopRecording(time);
      setTime(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording, time, onStartRecording, onStopRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full transition-all duration-300 py-3",
        isRecording ? "opacity-100" : "opacity-0 h-0"
      )}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
        <span className="font-mono text-sm text-white/80">{formatTime(time)}</span>
      </div>
      <div className="w-full h-10 flex items-center justify-center gap-0.5 px-4">
        {[...Array(visualizerBars)].map((_, i) => (
          <div
            key={i}
            className="w-0.5 rounded-full bg-white/50 animate-pulse"
            style={{
              height: `${Math.max(15, Math.random() * 100)}%`,
              animationDelay: `${i * 0.05}s`,
              animationDuration: `${0.5 + Math.random() * 0.5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

interface PromptInputContextType {
  isLoading: boolean;
  value: string;
  setValue: (value: string) => void;
  maxHeight: number | string;
  onSubmit?: () => void;
  disabled?: boolean;
}
const PromptInputContext = React.createContext<PromptInputContextType>({
  isLoading: false,
  value: "",
  setValue: () => {},
  maxHeight: 240,
  onSubmit: undefined,
  disabled: false,
});
function usePromptInput() {
  const context = React.useContext(PromptInputContext);
  if (!context) throw new Error("usePromptInput must be used within a PromptInput");
  return context;
}

interface PromptInputProps {
  isLoading?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
  maxHeight?: number | string;
  onSubmit?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  embedded?: boolean;
}
const PromptInput = React.forwardRef<HTMLDivElement, PromptInputProps>(
  (
    {
      className,
      isLoading = false,
      maxHeight = 240,
      value,
      onValueChange,
      onSubmit,
      children,
      disabled = false,
      embedded = false,
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(value || "");
    const handleChange = (newValue: string) => {
      setInternalValue(newValue);
      onValueChange?.(newValue);
    };
    return (
      <TooltipProvider>
        <PromptInputContext.Provider
          value={{
            isLoading,
            value: value ?? internalValue,
            setValue: onValueChange ?? handleChange,
            maxHeight,
            onSubmit,
            disabled,
          }}
        >
          <div
            ref={ref}
            className={cn(
              "transition-all duration-300",
              embedded
                ? "rounded-full border border-[#333333] bg-[#1F2023] shadow-none"
                : "rounded-2xl border border-[#444444] bg-[#1F2023] shadow-[0_8px_30px_rgba(0,0,0,0.24)]",
              isLoading && "border-red-500/70",
              className
            )}
            style={embedded ? { padding: "6px 8px 6px 16px" } : { padding: "20px 28px" }}
          >
            {children}
          </div>
        </PromptInputContext.Provider>
      </TooltipProvider>
    );
  }
);
PromptInput.displayName = "PromptInput";

interface PromptInputTextareaProps {
  disableAutosize?: boolean;
  placeholder?: string;
}
const PromptInputTextarea: React.FC<PromptInputTextareaProps & React.ComponentProps<typeof Textarea>> = ({
  className,
  onKeyDown,
  disableAutosize = false,
  placeholder,
  ...props
}) => {
  const { value, setValue, maxHeight, onSubmit, disabled } = usePromptInput();
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (disableAutosize || !textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      typeof maxHeight === "number"
        ? `${Math.min(textareaRef.current.scrollHeight, maxHeight)}px`
        : `min(${textareaRef.current.scrollHeight}px, ${maxHeight})`;
  }, [value, maxHeight, disableAutosize]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit?.();
    }
    onKeyDown?.(e);
  };

  return (
    <Textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      className={cn("text-base", className)}
      disabled={disabled}
      placeholder={placeholder}
      {...props}
    />
  );
};

interface PromptInputActionsProps extends React.HTMLAttributes<HTMLDivElement> {}
const PromptInputActions: React.FC<PromptInputActionsProps> = ({ children, className, ...props }) => (
  <div className={cn("flex items-center gap-2", className)} {...props}>
    {children}
  </div>
);

interface PromptInputActionProps extends React.ComponentProps<typeof Tooltip> {
  tooltip: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
}
const PromptInputAction: React.FC<PromptInputActionProps> = ({
  tooltip,
  children,
  className,
  side = "top",
  ...props
}) => {
  const { disabled } = usePromptInput();
  return (
    <Tooltip {...props}>
      <TooltipTrigger asChild disabled={disabled}>
        {children}
      </TooltipTrigger>
      <TooltipContent side={side} className={className}>
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
};

const iconTransition = { type: "spring" as const, stiffness: 400, damping: 25 };

interface PromptInputBoxProps {
  onSend?: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
  onRecordingChange?: (recording: boolean) => void;
  embedded?: boolean;
}
export const PromptInputBox = React.forwardRef((props: PromptInputBoxProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    onSend = () => {},
    isLoading = false,
    placeholder = "Type your message here...",
    className,
    onRecordingChange,
    embedded = false,
  } = props;
  const [input, setInput] = React.useState("");
  const [isRecording, setIsRecording] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const promptBoxRef = React.useRef<HTMLDivElement>(null);
  const recognitionRef = React.useRef<SpeechRecognition | null>(null);
  const transcriptRef = React.useRef("");

  React.useEffect(() => {
    injectStyles();
  }, []);

  const stopRecording = React.useCallback(() => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setIsRecording(false);
    onRecordingChange?.(false);
    const text = transcriptRef.current.trim();
    if (text) {
      onSend(text);
    }
    transcriptRef.current = "";
  }, [onSend, onRecordingChange]);

  const startRecording = React.useCallback(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) return;

    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognitionRef.current = recognition;
    transcriptRef.current = "";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let full = "";
      for (let i = 0; i < event.results.length; i++) {
        full += event.results[i][0].transcript;
      }
      transcriptRef.current = full;

      const wordCount = full.trim().split(/\s+/).filter(Boolean).length;
      if (wordCount >= 200) {
        stopRecording();
      }
    };

    recognition.onerror = () => stopRecording();
    recognition.onend = () => {
      if (recognitionRef.current) {
        stopRecording();
      }
    };

    recognition.start();
    setIsRecording(true);
    onRecordingChange?.(true);
  }, [stopRecording, onRecordingChange]);

  const handleSubmit = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  const handleStartRecording = () => {};

  const handleStopRecording = (_duration: number) => {
    stopRecording();
  };

  const showSend = isFocused;
  const canSend = input.trim().length > 0;

  const actionTooltip = isLoading
    ? "Stop generation"
    : isRecording
    ? "Stop recording"
    : showSend
    ? "Send message"
    : "Voice message";

  const handleActionClick = () => {
    if (isRecording) {
      stopRecording();
    } else if (showSend) {
      handleSubmit();
    } else {
      startRecording();
    }
  };

  const isActionDisabled = isLoading || (showSend && !canSend && !isRecording);

  return (
    <PromptInput
      value={input}
      onValueChange={setInput}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      embedded={embedded}
      className={cn(
        "w-full bg-[#1F2023] transition-all duration-300 ease-in-out",
        embedded ? "border-[#333333] shadow-none" : "border-[#444444] shadow-[0_8px_30px_rgba(0,0,0,0.24)]",
        isRecording && "border-red-500/70",
        className
      )}
      disabled={isLoading || isRecording}
      ref={ref || promptBoxRef}
    >
      <div
        className={cn(
          embedded ? "flex items-center gap-1" : "transition-all duration-300",
          !embedded && isRecording ? "h-0 overflow-hidden opacity-0" : !embedded ? "opacity-100" : ""
        )}
      >
        {!(embedded && isRecording) && (
          <div
            className={cn(
              embedded ? "flex min-w-0 flex-1 items-center" : "transition-all duration-300 w-full",
              !embedded && isRecording ? "h-0 overflow-hidden opacity-0" : !embedded ? "opacity-100" : ""
            )}
          >
            <PromptInputTextarea
              placeholder={placeholder}
              className={cn("text-base", embedded && "min-h-[36px] py-2 px-0 placeholder:text-[#6B7280]")}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </div>
        )}

        {!embedded && isRecording && (
          <VoiceRecorder
            isRecording={isRecording}
            onStartRecording={handleStartRecording}
            onStopRecording={handleStopRecording}
          />
        )}

        <PromptInputActions className={cn(embedded ? "shrink-0 ml-auto" : "flex items-center justify-end gap-2 px-1 pt-3")}>
          <PromptInputAction tooltip={actionTooltip}>
            <motion.button
              type="button"
              className={cn(
                "inline-flex items-center justify-center rounded-full border-2 font-medium transition-colors focus-visible:outline-none",
                embedded ? "h-8 w-8" : "h-9 w-9",
                isRecording
                  ? "border-transparent bg-transparent text-red-500 hover:bg-gray-600/30 hover:text-red-400"
                  : showSend && canSend
                  ? "border-[#333333] bg-white text-[#1F2023] hover:bg-white/80 shadow-[0_0_0_0_rgba(139,92,246,0)] hover:shadow-[0_0_12px_rgba(139,92,246,0.3)]"
                  : showSend
                  ? "cursor-not-allowed border-[#333333] bg-white/50 text-[#1F2023] opacity-50"
                  : "border-[#333333] bg-white text-[#1F2023] hover:bg-white/80"
              )}
              onClick={handleActionClick}
              disabled={isActionDisabled}
              whileHover={
                isRecording
                  ? { scale: 1.05 }
                  : showSend && canSend
                  ? { scale: 1.08 }
                  : !showSend
                  ? { scale: 1.05 }
                  : undefined
              }
              whileTap={
                isRecording
                  ? { scale: 0.95 }
                  : showSend && canSend
                  ? { scale: 0.92 }
                  : !showSend
                  ? { scale: 0.95 }
                  : undefined
              }
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {isLoading ? (
                <Square className="h-4 w-4 fill-[#1F2023] animate-pulse" />
              ) : isRecording ? (
                <StopCircle className="h-5 w-5 text-red-500" />
              ) : (
                <AnimatePresence mode="wait" initial={false}>
                  {showSend ? (
                    <motion.span
                      key="send"
                      initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.8, rotate: 15 }}
                      transition={iconTransition}
                      className="flex items-center justify-center"
                    >
                      <ArrowUp className="h-4 w-4 text-[#1F2023]" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="mic"
                      initial={{ opacity: 0, scale: 0.8, rotate: 15 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.8, rotate: -15 }}
                      transition={iconTransition}
                      className="flex items-center justify-center"
                    >
                      <Mic className={cn("text-[#1F2023]", embedded ? "h-4 w-4" : "h-5 w-5")} />
                    </motion.span>
                  )}
                </AnimatePresence>
              )}
            </motion.button>
          </PromptInputAction>
        </PromptInputActions>
      </div>

      {embedded && isRecording && (
        <VoiceRecorder
          isRecording={isRecording}
          onStartRecording={handleStartRecording}
          onStopRecording={handleStopRecording}
        />
      )}
    </PromptInput>
  );
});
PromptInputBox.displayName = "PromptInputBox";
