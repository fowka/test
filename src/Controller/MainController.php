<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MainController extends AbstractController
{
    private const EXTENDED_FILTER_ROWS = 3;

    #[Route('/', name: 'main_index')]
    public function index(): Response {
        return $this->render('main/index.html.twig', [
            'filterRows' => self::EXTENDED_FILTER_ROWS,
        ]);
    }
}