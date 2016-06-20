<?php

namespace Library;

class TemplateEngine
{
    protected $variables = [];
    protected $templateFile = false;
    protected $viewBase;

    public function __construct($templateFile = false)
    {
        $this->viewBase = dirname(__DIR__) . '/YBoard/View/';
        if (!$templateFile) {
            $templateFile = 'Default';
        }

        $template = $this->viewBase . 'Template/' . $templateFile . '.phtml';
        if (!file_exists($template)) {
            throw new \Exception('Error loading the template file ' . $template . ': file does not exist.');
        }
        $this->templateFile = $templateFile;
    }

    public function __get($name)
    {
        return $this->variables[$name];
    }

    public function __set($name, $content)
    {
        $this->variables[$name] = $content;
    }

    public function display($viewFile, $returnAsString = false)
    {
        // Validate viewFile
        if (!preg_match('/^[a-z0-9_\-]+$/i', $viewFile)) {
            throw new \Exception('Invalid view file: ' . $viewFile . '.');
        }
        $viewFile = $this->viewBase . 'Page/' . $viewFile . '.phtml';

        if (!file_exists($viewFile)) {
            throw new \Exception('Error loading the view file ' . $viewFile . ': file does not exist.');
        }

        foreach ($this->variables AS $variable => $content) {
            $$variable = $content;
        }

        ob_start();
        require($viewFile);
        $output = ob_get_clean();

        if ($returnAsString) {
            ob_start();
        }

        require($this->viewBase . 'Template/' . $this->templateFile . '.phtml');

        if ($returnAsString) {
            return ob_get_clean();
        }

        return false;
    }
}