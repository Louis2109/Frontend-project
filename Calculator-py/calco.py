import tkinter as tk

class Calculator(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title('Simple Calculator')
        self.geometry('320x480')
        self.resizable(0, 0)
        self.configure(bg='#f0f0f0')

        self.current_operation = ''
        self.calculation_done = False

        self.create_widgets()

    def create_widgets(self):
        # Display
        self.display = tk.Entry(self, font=('Arial', 24), borderwidth=0, relief='flat', justify='right', bg='#fff', fg='#000')
        self.display.pack(padx=20, pady=(30, 10), fill='x')
        self.display.insert(0, '')

        # Buttons
        btns_frame = tk.Frame(self, bg='#333')
        btns_frame.pack(padx=20, pady=10)

        buttons = [
            ('C', 1, 0, '#ff9500'), ('/', 1, 1, '#ff9500'), ('×', 1, 2, '#ff9500'), ('←', 1, 3, '#ff9500'),
            ('7', 2, 0, '#666'),    ('8', 2, 1, '#666'),    ('9', 2, 2, '#666'),    ('-', 2, 3, '#ff9500'),
            ('4', 3, 0, '#666'),    ('5', 3, 1, '#666'),    ('6', 3, 2, '#666'),    ('+', 3, 3, '#ff9500'),
            ('1', 4, 0, '#666'),    ('2', 4, 1, '#666'),    ('3', 4, 2, '#666'),    ('=', 4, 3, '#ff9500'),
            ('0', 5, 0, '#666'),    ('.', 5, 2, '#666')
        ]

        for (text, row, col, color) in buttons:
            if text == '0':
                btn = tk.Button(btns_frame, text=text, width=10, height=3, bg=color, fg='white', borderwidth=0, font=('Arial', 18),
                                command=lambda val=text: self.on_button_click(val))
                btn.grid(row=row, column=col, columnspan=2, sticky="nsew", padx=5, pady=5)
            elif text == '.':
                btn = tk.Button(btns_frame, text=text, width=5, height=3, bg=color, fg='white', borderwidth=0, font=('Arial', 18),
                                command=lambda val=text: self.on_button_click(val))
                btn.grid(row=row, column=col+1, sticky="nsew", padx=5, pady=5)
            else:
                btn = tk.Button(btns_frame, text=text, width=5, height=3, bg=color, fg='white', borderwidth=0, font=('Arial', 18),
                                command=lambda val=text: self.on_button_click(val))
                btn.grid(row=row, column=col, sticky="nsew", padx=5, pady=5)

        # Configure grid weights for resizing
        for i in range(6):
            btns_frame.grid_rowconfigure(i, weight=1)
            if i < 4:
                btns_frame.grid_columnconfigure(i, weight=1)

    def on_button_click(self, value):
        if value.isdigit() or value == '.':
            if self.calculation_done:
                self.current_operation = ''
                self.calculation_done = False
            self.current_operation += value
            self.update_display()
        elif value in ('+', '-', '×', '/'):
            if self.current_operation and self.current_operation[-1] not in '+-×/':
                self.current_operation += value
                self.update_display()
                self.calculation_done = False
        elif value == '=':
            if self.current_operation:
                try:
                    result = eval(self.current_operation.replace('×', '*').replace('÷', '/'))
                    self.display.delete(0, tk.END)
                    self.display.insert(0, str(result))
                    self.current_operation = str(result)
                    self.calculation_done = True
                except Exception:
                    self.display.delete(0, tk.END)
                    self.display.insert(0, 'Error')
                    self.current_operation = ''
                    self.calculation_done = True
        elif value == 'C':
            self.current_operation = ''
            self.display.delete(0, tk.END)
        elif value == '←':
            if not self.calculation_done:
                self.current_operation = self.current_operation[:-1]
                self.update_display()

    def update_display(self):
        self.display.delete(0, tk.END)
        self.display.insert(0, self.current_operation)

if __name__ == '__main__':
    app = Calculator()
    app.mainloop()