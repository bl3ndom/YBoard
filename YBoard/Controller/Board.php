<?php
namespace YBoard\Controller;

use YBoard\Controller;
use YBoard\Model;
use YFW\Library\HttpResponse;

class Board extends Controller
{
    public function index(string $boardUrl, int $pageNum = 1): void
    {
        $this->verifyBoard($boardUrl);
        $this->limitPages($pageNum, $this->config['view']['maxPages']);

        Model\Thread::setHidden($this->user->threadHide->getAll());

        $board = Model\Board::getByUrl($this->db, $boardUrl);
        $threads = Model\Thread::getByBoard($this->db, $board->id, $pageNum, $this->user->preferences->threadsPerPage,
            $this->user->preferences->repliesPerThread);

        $isLastPage = count($threads) < $this->user->preferences->threadsPerPage;

        $view = $this->loadTemplateEngine();

        $view->setVar('pageTitle', $board->name);
        $view->setVar('bodyClass', 'board-page');
        $view->setVar('threads', $threads);

        $this->initializePagination($view, $pageNum, $this->config['view']['maxPages'], $isLastPage);

        $view->setVar('board', $board);
        $view->display('Board');
    }

    public function catalog(string $boardUrl, int $pageNum = 1): void
    {
        $this->verifyBoard($boardUrl);
        $this->limitPages($pageNum, $this->config['view']['maxCatalogPages']);

        Model\Thread::setHidden($this->user->threadHide->getAll());

        $board = Model\Board::getByUrl($this->db, $boardUrl);
        $threads = Model\Thread::getByBoard($this->db, $board->id, $pageNum, $this->user->preferences->threadsPerCatalogPage);

        $isLastPage = count($threads) < $this->user->preferences->threadsPerCatalogPage;

        $view = $this->loadTemplateEngine();

        $view->setVar('pageTitle', $board->name);
        $view->setVar('bodyClass', 'board-catalog');

        $this->initializePagination($view, $pageNum, $this->config['view']['maxCatalogPages'], $isLastPage, '/catalog');

        $view->setVar('board', $board);
        $view->setVar('threads', $threads);
        $view->display('BoardCatalog');
    }

    public function redirect(string $boardUrl, int $boardPage = 1, string $catalog = '', int $catalogPage = 1): void
    {
        // Verify board exists
        $redirTo = false;
        if (Model\Board::exists($this->db, $boardUrl)) {
            $redirTo = Model\Board::getByUrl($this->db, $boardUrl)->url;
        } elseif (Model\Board::isAltUrl($this->db, $boardUrl)) {
            $redirTo = Model\Board::getUrlByAltUrl($this->db, $boardUrl);
        }

        if (!empty($catalog)) {
            $redirTo .= '/catalog';
        }

        if ($redirTo) {
            HttpResponse::redirectExit('/' . $redirTo . '/', 302);
        }

        $this->notFound();
    }

    protected function verifyBoard(string $boardUrl): void
    {
        if (!Model\Board::exists($this->db, $boardUrl)) {
            if (Model\Board::isAltUrl($this->db, $boardUrl)) {
                HttpResponse::redirectExit('/' . Model\Board::getUrlByAltUrl($this->db, $boardUrl) . '/', 302);
            }
            // Board does not exist and no alt_url match
            $this->notFound(_('Not found'),
                sprintf(_('There\'s no such thing as a board called "%s" here.'), $boardUrl));
        }
    }
}
