<?php

namespace App\Controller;

use App\Entity\TurnosPredefinidos;
use App\Repository\TurnosPredefinidosRepository;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/turnos/predefinidos", name="turnos_predefinidos_")
 */
class TurnosPredefinidosController extends AbstractController
{
    /**
     * @Route("/listar", name="listar")
     */
    public function index(TurnosPredefinidosRepository $predefinidosRepository): Response
    {
        $predefinidos = $predefinidosRepository->findAll();
        return $this->render('turnos_predefinidos/gestiona.html.twig', [
            'turnos' => $predefinidos
        ]);
    }

    /**
     * @Route("/get", name="datos")
     */
    public function recoger(TurnosPredefinidosRepository $predefinidosRepository): Response
    {
        $predefinidos = $predefinidosRepository->findAll();
        $horarios = array();

        foreach($predefinidos as $horario) {

            array_push($horarios, ["id" => $horario->getId(), "entrada" => $horario->getHoraInicio()->format("H.i") , "salida" => $horario->getHoraFin()->format("H.i") ]);
        }
        dump($horarios);
        return new JsonResponse($horarios);
    }

    /**
     * @Route("/crear", name="seccion_nueva")
     */
    public function gestionarSecciones(Request $request, TurnosPredefinidos $turno = null): Response
    {
        if ($request->isXMLHttpRequest()) {
            $content = $request->getContent();
            if (!empty($content)) {
                $params = json_decode($content, true);
                $inicio = new \Datetime(date('H:i', strtotime($params['HoraInicio'])));
                $fin = new \Datetime(date('H:i', strtotime($params['HoraFin'])));
                $em = $this->getDoctrine()->getManager();
                $turno = new TurnosPredefinidos();
                $turno->setHoraInicio($inicio);
                $turno->setHoraFin($fin);
                $em->persist($turno);
                $em->flush();
            }
            return new JsonResponse($turno->getId());
        }
        return new Response('Error!', 400);
    }

    /**
     * @Route("/eliminar/{id}", name="elemento_eliminar")
     */
    public function eliminar(Request $request, TurnosPredefinidosRepository $predefinidosRepository, $id): Response
    {
        if ($request->isXMLHttpRequest()) {
            $turno = $predefinidosRepository->findById($id);
            $this->getDoctrine()->getManager()->remove($turno);
            $this->getDoctrine()->getManager()->flush();
            return new JsonResponse(true);
        }
        return new Response('Error!', 400);
    }
}
